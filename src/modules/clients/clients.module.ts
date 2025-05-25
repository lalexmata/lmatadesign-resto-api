import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsController } from '@clients/controllers/clients.controller';
import { Client } from '@clients/Entity/clients.entity';
import { ClientsService } from '@clients/services/clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
