import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../Entity/orders.entity';
import { OrderDetail } from '../Entity/ordersDetail.entity';
import { ProductoInsumo } from 'src/modules/products/Entity/productInventory.entity';
import { Inventory } from 'src/modules/inventario/Entity/inventory.entity';
import { CreateOrderDto, UpdateOrderDto } from '../Dto/ordersDto';
import { User } from 'src/modules/users/Entity/user.entity';
import { Client } from 'src/modules/clients/Entity/clients.entity';
import { Table } from 'src/modules/tables/Entity/tables.entity';
import { Product } from 'src/modules/products/Entity/products.entity';

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order) private ordersRepository: Repository<Order>,
		@InjectRepository(OrderDetail) private ordersDetailRepository: Repository<OrderDetail>,
		@InjectRepository(ProductoInsumo) private productInsumoRepository: Repository<ProductoInsumo>,
		@InjectRepository(Product) private productRepository: Repository<Product>,
		@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Client) private clientRepository: Repository<Client>,
		@InjectRepository(Table) private tableRepository: Repository<Table>
	){}

	async updateStateOrder(idPedido: number, updatePedidoDto: UpdateOrderDto) {
		const { state } = updatePedidoDto;
		const pedido = await this.ordersRepository.findOne({ where: { id: idPedido } });

		if (!pedido) {
			throw new NotFoundException('Pedido no encontrado');
		}

		// Si el pedido pasa a "Entregado", descontar inventario
		if (state === 'Entregado') {
			const detalles = await this.ordersDetailRepository.find({
				where: { order: { id: idPedido } },
				relations: ['product'],
			});

			for (const detalle of detalles) {
				const insumos = await this.productInsumoRepository.find({
					where: { product: { id: detalle.product.id } },
					relations: ['insumo'],
				});

				for (const insumoUso of insumos) {
					const insumo = insumoUso.insumo;
					const cantidadNecesaria = insumoUso.amount_used * detalle.quantity;

					if (insumo.amount < cantidadNecesaria) {
						throw new BadRequestException(`Stock insuficiente para ${insumo.name}`);
					}

					// Descontar del inventario
					insumo.amount -= cantidadNecesaria;
					await this.inventoryRepository.save(insumo);
				}
			}
		}

		// Actualizar el estado del pedido
		pedido.state = state;
		await this.ordersRepository.save(pedido);

		return { message: `Pedido actualizado a estado: ${state}` };
	}

	async createOrder(dto: CreateOrderDto) {
		try {
			// Validar si el usuario existe
			const user = await this.userRepository.findOne({ where: { id: dto.user_id } });
			if (!user) {
				throw new NotFoundException(`El usuario con ID ${dto.user_id} no existe`);
			}
	
			//validando cliente
			if(dto.client_id){
				const cliente = await this.clientRepository.findOne({where: {id: dto.client_id}});
				if(!cliente){
					throw new NotFoundException(`El cliente con ID ${dto.client_id} no existe`);
				}
			}
	
			//validar disponibilidad de mesa
			if(dto.table_id){
				const table = await this.tableRepository.findOne({where: {id: dto.table_id}});
				if(!table || table.state !== 'Disponible'){
					throw new BadRequestException('La mesa no está disponible');
				}
			}
	
			//creando pedido
			const orderData: CreateOrderDto = {
				table_id: dto.table_id,
				client_id: dto.client_id,
				user_id: dto.user_id,
				state: 'Pendiente',
				total: 0, //se calcula despues
				detail: []
			};
			const newOrder = await this.ordersRepository.create(orderData);
			await this.ordersRepository.save(newOrder);
	
			let total = 0;
	
			//registrando productos en detalle productos
			for(const detalle of dto.detail){
				const product = await this.productRepository.findOne({ where: { id: detalle.product_id}});
	
				if(!product){
					throw new NotFoundException(`Producto con ID ${detalle.product_id} no encontrado`);
				}
	
				const subtotal = product.price * detalle.quantity;
				total += subtotal;
				 const detail = {
					order: newOrder,
					product,
					quantity: detalle.quantity,
					subtotal
				};
				console.log("detalle de " + product.name, " es  --->" + detalle.quantity);
				newOrder.total = total;

				await this.ordersDetailRepository.save(detail);
			}
	
			// 3️⃣ Aplicar descuento si existe
			if (dto.discount_id) {
				/*const descuento = await this.discountRepository.findOne({ where: { id: dto.discount_id } });
				if (descuento) {
					total -= total * (descuento.porcent / 100);
				}*/
			}
		
			// 4️⃣ Actualizar el total en `pedidos`
			newOrder.total = total;

			console.log("el total de la cuenta va en " + total);
			await this.ordersDetailRepository.save(newOrder);
	
			return { message: 'Pedido creado con éxito', pedido: newOrder };
		} catch (error) {
			console.error(error);
			throw Error('Ocurrio un error al crear el pedido');
		}
    
  	}

	async getAll(){
		return await this.ordersRepository.find({ relations: ['detail']});
	}
}
