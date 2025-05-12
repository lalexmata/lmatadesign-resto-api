import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto, UpdateClientDto } from '../Dto/ClientDto';

@Controller('clients')
export class ClientsController {

    constructor(
        private clientService: ClientsService
    ){}

    @Get()
    async getAll(){
        return this.clientService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id') id: number){
        return this.clientService.getOne(id);
    }

    @Post()
    async create(@Body() data: CreateClientDto){
        return this.clientService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: UpdateClientDto){
        return await this.clientService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number){
        return await this.clientService.delete(id);
    }
}
