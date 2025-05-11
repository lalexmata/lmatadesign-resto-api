import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Entity/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../Dto/productDto';
import { Category } from 'src/modules/categories/Entity/category.entity';
import { Inventory } from 'src/modules/inventario/Entity/inventory.entity';
import { ProductInventory } from '../Entity/productInventory.entity';

@Injectable()
export class ProductsService {

	constructor(
		@InjectRepository(Product) private productRepository: Repository<Product>,
		@InjectRepository(Category) private categoryRepository: Repository<Category>,
		@InjectRepository(Inventory) private inventoryRepo: Repository<Inventory>,
		@InjectRepository(ProductInventory) private productsInventoryRepository: Repository<ProductInventory>
	){}

	async findAll(){
		return this.productRepository.find({relations: ['categories']});
	}

	async findOne(id: number){
		return this.productRepository.findOne({ where: {id}, relations: ['categories']});
	}

	async create(data: CreateProductDto){
		const { category_ids, ...productData} = data;
		const categories = await this.categoryRepository.findByIds(category_ids);

		
		const newProduct = this.productRepository.create({
			...productData,
			categories
		});

		const savedProduct = await this.productRepository.save(newProduct);

		for(const ingredient of data.ingredients){
			const inventory = await this.inventoryRepo.findOne({ where: {id:ingredient.inventory_id}});
			if (!inventory) throw new NotFoundException(`Insumo ID ${ingredient.inventory_id} no encontrado`);

			const relation = this.productsInventoryRepository.create({
				quantity_used: ingredient.quantity_used,
			});
			relation.product = savedProduct;
			relation.insumo = inventory;
			await this.productsInventoryRepository.save(relation);
		}

		return savedProduct;
	}

	async update(id: number, data: UpdateProductDto){
		const { category_ids, ...productData} = data;
		const product = await this.productRepository.findOne({
			where: {id},
			relations: ['categories']
		});

		if (!product) {
			throw new NotFoundException(`Producto con ID ${id} no encontrado`);
		}

		if (category_ids) {
			const categories = await this.categoryRepository.findByIds(category_ids);
			product.categories = categories;
		}
		Object.assign(product, productData);
		if(data.ingredients){
			await this.productsInventoryRepository.delete({ product: { id: product.id } });
			for(const ingredient of data.ingredients){
				const inventory = await this.inventoryRepo.findOne({ where: {id:ingredient.inventory_id}});
				if (!inventory) throw new NotFoundException(`Insumo ID ${ingredient.inventory_id} no encontrado`);
	
				const relation = this.productsInventoryRepository.create({
					quantity_used: ingredient.quantity_used,
				});
				relation.product = product;
				relation.insumo = inventory;
				await this.productsInventoryRepository.save(relation);
			}
		}

		
		return await this.productRepository.save(product);
	}

	async remove(id: number){
		return this.productRepository.delete(id);
	}
    
}
