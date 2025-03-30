import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../Entity/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../Dto/productDto';
import { Category } from 'src/modules/categories/Entity/category.entity';

@Injectable()
export class ProductsService {

	constructor(
		@InjectRepository(Product) private productRepository: Repository<Product>,
		@InjectRepository(Category) private categoryRepository: Repository<Category>
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
		return await this.productRepository.save(newProduct);
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
		
		return await this.productRepository.save(product);
	}

	async remove(id: number){
		return this.productRepository.delete(id);
	}
    
}
