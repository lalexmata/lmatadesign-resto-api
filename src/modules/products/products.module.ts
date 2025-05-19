import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './contollers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Entity/products.entity';
import { Category } from '../categories/Entity/category.entity';
import { Inventory } from '../inventario/Entity/inventory.entity';
import { ProductInventory } from './Entity/productInventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Inventory, ProductInventory]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
