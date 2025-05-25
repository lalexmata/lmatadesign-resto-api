import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OrdersService } from '@orders/services/orders.service';

import { CreateInsumoDto, UpdateStockDto } from '@inventario/Dto/inventoryDto';
import { InventoryService } from '@inventario/services/inventory.service';

@Controller('inventory')
@UseGuards(AuthGuard('jwt'))
export class InventarioController {
  constructor(
    private readonly intentoryService: InventoryService,
    private readonly orderService: OrdersService,
  ) {}
  @Get()
  async getInventory() {
    return await this.intentoryService.getAll();
  }

  @Get('consolidate')
  async discountInventoryToday() {
    return await this.orderService.discountInventoryToday();
  }

  @Get(':id')
  async getStock(@Param('id') id: number) {
    return await this.intentoryService.getStock(id);
  }

  @Post()
  async create(@Body() data: CreateInsumoDto) {
    return await this.intentoryService.create(data);
  }

  @Put(':id')
  async updateStock(
    @Param('id') id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return await this.intentoryService.updateStock(id, updateStockDto);
  }
}
