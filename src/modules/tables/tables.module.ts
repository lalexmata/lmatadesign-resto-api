import { Module } from '@nestjs/common';
import { TablesService } from './services/tables.service';
import { TablesController } from './controllers/tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './Entity/tables.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  providers: [TablesService],
  controllers: [TablesController],
})
export class TablesModule {}
