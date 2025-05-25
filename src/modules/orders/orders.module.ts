import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from '@clients/Entity/clients.entity';
import { Inventory } from '@inventario/Entity/inventory.entity';
import { ProductInventory } from '@products/Entity/productInventory.entity';
import { Product } from '@products/Entity/products.entity';
import { Table } from '@tables/Entity/tables.entity';
import { User } from '@users/Entity/user.entity';

import { Order } from '@orders/Entity/orders.entity';
import { OrderDetail } from '@orders/Entity/ordersDetail.entity';
import { OrdersController } from '@orders/controllers/orders.controller';
import { OrdersService } from '@orders/services/orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderDetail,
      Inventory,
      Product,
      ProductInventory,
      User,
      Client,
      Table,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
