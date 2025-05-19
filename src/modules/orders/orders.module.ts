import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './Entity/orders.entity';
import { OrderDetail } from './Entity/ordersDetail.entity';
import { Inventory } from '../inventario/Entity/inventory.entity';
import { Product } from '../products/Entity/products.entity';
import { ProductInventory } from '../products/Entity/productInventory.entity';
import { User } from '../users/Entity/user.entity';
import { Client } from '../clients/Entity/clients.entity';
import { Table } from '../tables/Entity/tables.entity';
import { OrdersController } from './controllers/orders.controller';

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
