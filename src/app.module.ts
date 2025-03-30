import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { InventarioModule } from './modules/inventario/inventario.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, CategoriesModule, ProductsModule, InventarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
