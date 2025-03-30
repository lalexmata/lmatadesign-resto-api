import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './contollers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Entity/products.entity';
import { Category } from '../categories/Entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
