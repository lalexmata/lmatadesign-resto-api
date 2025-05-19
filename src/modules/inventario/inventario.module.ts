import { Module } from '@nestjs/common';
import { InventarioController } from './controllers/inventario.controller';
import { InventoryService } from './services/inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './Entity/inventory.entity';
import { Order } from '../orders/Entity/orders.entity';
import { OrdersService } from '../orders/services/orders.service';
import { ProductInventory } from '../products/Entity/productInventory.entity';
import { OrderDetail } from '../orders/Entity/ordersDetail.entity';
import { Product } from '../products/Entity/products.entity';
import { User } from '../users/Entity/user.entity';
import { Client } from '../clients/Entity/clients.entity';
import { Table } from '../tables/Entity/tables.entity';

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
