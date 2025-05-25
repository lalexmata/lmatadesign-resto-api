import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/auth.module';
import { CategoriesModule } from '@categories/categories.module';
import { ClientsModule } from '@clients/clients.module';
import { DatabaseModule } from '@database/database.module';
import { InventarioModule } from '@inventario/inventario.module';
import { OrdersModule } from '@orders/orders.module';
import { ProductsModule } from '@products/products.module';
import { TablesModule } from '@tables/tables.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    InventarioModule,
    OrdersModule,
    TablesModule,
    ClientsModule,
  ],
})
export class AppModule {}
