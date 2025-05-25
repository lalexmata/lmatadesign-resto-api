import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateClientDto, UpdateClientDto } from '@clients/Dto/ClientDto';
import { ClientsService } from '@clients/services/clients.service';

@Controller('clients')
@UseGuards(AuthGuard('jwt'))
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Get()
  async getAll() {
    return this.clientService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.clientService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateClientDto) {
    return this.clientService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateClientDto) {
    return await this.clientService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.clientService.delete(id);
  }
}
