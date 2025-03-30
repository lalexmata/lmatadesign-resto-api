import { Module } from '@nestjs/common';
import { InventarioController } from './controllers/inventario.controller';
import { InventoryService } from './services/inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './Entity/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventarioController],
  providers: [InventoryService]
})
export class InventarioModule {}
