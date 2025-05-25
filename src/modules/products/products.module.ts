import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '@categories/Entity/category.entity';
import { Inventory } from '@inventario/Entity/inventory.entity';
import { Product } from '@products/Entity/products.entity';

import { ProductsController } from '@products/controllers/products.controller';
import { ProductInventory } from '@products/Entity/productInventory.entity';
import { ProductsService } from '@products/services/products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Inventory, ProductInventory]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
