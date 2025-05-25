import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { CreateTableDto } from '@tables/Dto/tableDto';
import { TablesService } from '@tables/services/tables.service';

@Controller('tables')
export class TablesController {
  constructor(private tableService: TablesService) {}

  @Get()
  async getAll() {
    return await this.tableService.getAll();
  }

  @Get(':id')
  async getOne(id: number) {
    return await this.tableService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateTableDto) {
    return await this.tableService.create(data);
  }

  @Put(':id')
  async update(id: number, @Body() data: any) {
    return this.tableService.update(id, data);
  }

  @Delete(':id')
  async delete(id: number) {
    return await this.tableService.delete(id);
  }
}
