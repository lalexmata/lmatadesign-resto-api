import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '@orders/Entity/orders.entity';
import { OrdersService } from '@orders/services/orders.service';
import { ProductInventory } from '@products/Entity/productInventory.entity';
import { OrderDetail } from '@orders/Entity/ordersDetail.entity';
import { Product } from '@products/Entity/products.entity';
import { User } from '@users/Entity/user.entity';
import { Client } from '@clients/Entity/clients.entity';
import { Table } from '@tables/Entity/tables.entity';

import { InventarioController } from '@inventario/controllers/inventario.controller';
import { InventoryService } from '@inventario/services/inventory.service';
import { Inventory } from '@inventario/Entity/inventory.entity';

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
