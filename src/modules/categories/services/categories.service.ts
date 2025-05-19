import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../Entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from '../Dto/categoryDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  async findByIds(ids: number[]) {
    return this.categoryRepository.findByIds(ids);
  }

  async findOne(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    return this.categoryRepository.save(newCategory);
  }
  async update(id: number, data: UpdateCategoryDto) {
    await this.categoryRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
