import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Order } from '../Entity/orders.entity';
import { OrderDetail } from '../Entity/ordersDetail.entity';
import { Inventory } from 'src/modules/inventario/Entity/inventory.entity';
import { CreateOrderDto, UpdateOrderDto } from '../Dto/ordersDto';
import { User } from 'src/modules/users/Entity/user.entity';
import { Client } from 'src/modules/clients/Entity/clients.entity';
import { Table } from 'src/modules/tables/Entity/tables.entity';
import { Product } from 'src/modules/products/Entity/products.entity';
import { instanceToPlain } from 'class-transformer';
import { ProductInventory } from 'src/modules/products/Entity/productInventory.entity';

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order) private ordersRepository: Repository<Order>,
		@InjectRepository(OrderDetail) private ordersDetailRepository: Repository<OrderDetail>,
		@InjectRepository(Product) private productRepository: Repository<Product>,
		@InjectRepository(ProductInventory) private productInventoryRepo: Repository<ProductInventory>,
		@InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
		@InjectRepository(User) private userRepository: Repository<User>,
		@InjectRepository(Client) private clientRepository: Repository<Client>,
		@InjectRepository(Table) private tableRepository: Repository<Table>
	){}

	async updateOrder(id: number, dto: UpdateOrderDto) {
    try {
      // 1️⃣ Buscar la orden existente
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: ['detail', 'detail.product'],
      });
  
      if (!order) {
        throw new NotFoundException(`Orden con ID ${id} no encontrada`);
      }
      
      if(dto.detail){
        // 2️⃣ Revertir stock de insumos del pedido anterior
        for (const oldDetail of order.detail) {
          const product = await this.productRepository.findOne({
            where: { id: oldDetail.product.id },
            relations: ['productsInventory', 'productsInventory.insumo'],
          });
  
          if(product){
            for (const relation of product.productsInventory) {
              relation.insumo.amount += relation.quantity_used * oldDetail.quantity;
              await this.inventoryRepository.save(relation.insumo);
            }
          }
    
        }
    
        // 3️⃣ Eliminar los detalles anteriores
        await this.ordersDetailRepository.delete({ order: { id: order.id } });
    
        // 4️⃣ Registrar nuevos detalles y descontar stock
        let total = 0;
        const newDetails:any = [];
        
        for (const item of dto.detail) {
          const product = await this.productRepository.findOne({
            where: { id: item.product_id },
            relations: ['productsInventory', 'productsInventory.inventory'],
          });
    
          if (!product) {
            throw new NotFoundException(`Producto con ID ${item.product_id} no encontrado`);
          }
    
          const subtotal = product.price * item.quantity;
          total += subtotal;
    
          const detail = this.ordersDetailRepository.create({
            order,
            product,
            quantity: item.quantity,
            subtotal,
          });
    
          await this.ordersDetailRepository.save(detail);
          newDetails.push(detail);
    
          // Descontar insumos del inventario
          /*for (const relation of product.productsInventory) {
            relation.insumo.amount -= relation.quantity_used * item.quantity;
            await this.inventoryRepository.save(relation.insumo);
          }*/
        }

        order.total = total;
        order.detail = newDetails;
      }
  
      // 5️⃣ Actualizar los campos de la orden
      order.table = dto.table_id ? { id: dto.table_id } as any : null;
      order.client = dto.client_id ? { id: dto.client_id } as any : null;
      order.user = { id: dto.user_id } as any;
      if(order.state){
        order.state = dto.state ? dto.state: 'Pendiente';
      }
    
      order.observations = dto.observations ? dto.observations : '';
  
      await this.ordersRepository.save(order);
  
      return {
        message: 'Orden actualizada con éxito',
        order,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al actualizar la orden');
    }
  }

	
  async createOrder(dto: CreateOrderDto) {
    try {
      // Validaciones previas...
  
      // 1️⃣ Buscar entidades relacionadas (user, client, table)
      const user = await this.userRepository.findOne({ where: { id: dto.user_id } });
      if (!user) throw new NotFoundException(`Usuario con ID ${dto.user_id} no existe`);
  
      const client = dto.client_id
        ? await this.clientRepository.findOne({ where: { id: dto.client_id } })
        : null;
      if (dto.client_id && !client) throw new NotFoundException(`Cliente con ID ${dto.client_id} no existe`);
  
      const table = dto.table_id
        ? await this.tableRepository.findOne({ where: { id: dto.table_id } })
        : null;
      if (dto.table_id && (!table || table.state !== 'Disponible'))
        throw new BadRequestException(`La mesa no está disponible`);
  
      // 2️⃣ Crear y guardar la orden sin detalles aún
      const order = this.ordersRepository.create({
        state: dto.state,
        total: 0, // provisional
      });

      order.user = user;
      if(client){
        order.client = client;
      }

      if(table){
        order.table = table;
      }
      

      const savedOrder = await this.ordersRepository.save(order); // 👈 Aquí se genera el ID
  
      // 3️⃣ Crear y guardar detalles
      let total = 0;
      const detailsToSave: OrderDetail[] = [];
  
      for (const detail of dto.detail) {
        const product = await this.productRepository.findOne({
          where: { id: detail.product_id },
          relations: ['productsInventory', 'productsInventory.insumo'], // importante
        });
        if (!product) throw new NotFoundException(`Producto ID ${detail.product_id} no encontrado`);
  
        const subtotal = product.price * detail.quantity;
        total += subtotal;
  
        const orderDetail = this.ordersDetailRepository.create({
          order: savedOrder, // ✅ Aquí se asocia con el ID ya generado
          product,
          quantity: detail.quantity,
          subtotal,
        });
  
        detailsToSave.push(orderDetail);
        // esto es para descontar del inventario al crear el pedido
        /*for (const pi of product.productsInventory) {
          const cantidadDescontar = Number(pi.quantity_used) * detail.quantity;

          const inventario = await this.inventoryRepository.findOne({ where: { id: pi.insumo.id } });
          if (!inventario) throw new NotFoundException(`Insumo ID ${pi.insumo.id} no encontrado`);

          if (inventario.amount < cantidadDescontar) {
            throw new BadRequestException(
              `No hay suficiente stock de ${inventario.name}. Disponible: ${inventario.amount}, requerido: ${cantidadDescontar}`
            );
          }

          inventario.amount -= cantidadDescontar;
          await this.inventoryRepository.save(inventario);
        }*/
      }
  
      await this.ordersDetailRepository.save(detailsToSave); // Se guardan todos los detalles
  
      // 4️⃣ Actualizar total en la orden
      savedOrder.total = total;
      await this.ordersRepository.save(savedOrder); // Guardar total actualizado
      const newOrder = await this.getOne(savedOrder.id);

      return {
        message: 'Pedido creado con éxito',
        order: instanceToPlain(newOrder),
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al crear el pedido');
    }
  }
  
	async getAll(){
		return await instanceToPlain(this.ordersRepository.find({ relations: ['detail']}));
	}

	async getOne(id: number){
		const order = await this.ordersRepository.findOne({
			where: { id: id },
			relations: ['detail', 'table', 'client', 'user'], 
		  });
		  
		return instanceToPlain(order);
	}

	async deleteOrder(orderId: number): Promise<{ message: string }> {
		// Verificamos si el pedido existe
		const order = await this.ordersRepository.findOne({
		  where: { id: orderId },
		  relations: ['detail'],
		});
	  
		if (!order) {
		  throw new NotFoundException(`Pedido con ID ${orderId} no existe`);
		}
	  
		// Eliminamos los detalles del pedido primero
		await this.ordersDetailRepository.delete({ order: { id: orderId } });
	  
		// Luego eliminamos el pedido
		await this.ordersRepository.delete(orderId);
	  
		return { message: 'Pedido eliminado con éxito' };
	}

  async discountInventoryToday() {

    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    
      const orders = await this.ordersRepository.find({
        where: {
          state: 'Entregado',
          created_at: MoreThan(today),
        },
        relations: ['detail', 'detail.product'],
      });
      console.log("result de orders es",orders);
      for (const order of orders) {
        for (const detail of order.detail) {
          const productInsumos = await this.productInventoryRepo.find({
            where: { product: { id: detail.product.id } },
            relations: ['insumo'],
          });
    
          for (const pi of productInsumos) {
            const cantidadTotal = pi.quantity_used * detail.quantity;
            pi.insumo.amount -= cantidadTotal;
            await this.inventoryRepository.save(pi.insumo);
          }
        }
      }
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Ocurrió un error al actualizar inventario`);
    }
    
    return { message: 'Inventario actualizado con base en órdenes entregadas del día', error: false };
  }
  
}
