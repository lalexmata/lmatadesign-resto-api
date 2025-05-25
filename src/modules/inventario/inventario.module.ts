import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Client } from '@clients/Entity/clients.entity';
import { Order } from '@orders/Entity/orders.entity';
import { OrderDetail } from '@orders/Entity/ordersDetail.entity';
import { OrdersService } from '@orders/services/orders.service';
import { ProductInventory } from '@products/Entity/productInventory.entity';
import { Product } from '@products/Entity/products.entity';
import { Table } from '@tables/Entity/tables.entity';
import { User } from '@users/Entity/user.entity';

import { InventarioController } from '@inventario/controllers/inventario.controller';
import { Inventory } from '@inventario/Entity/inventory.entity';
import { InventoryService } from '@inventario/services/inventory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventory,
      Order,
      ProductInventory,
      OrderDetail,
      Product,
      User,
      Client,
      Table,
    ]),
  ],
  controllers: [InventarioController],
  providers: [InventoryService, OrdersService],
})
export class InventarioModule {}
