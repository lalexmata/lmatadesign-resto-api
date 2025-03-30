import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';
import { CreateInsumoDto, UpdateStockDto } from '../Dto/inventoryDto';

@Controller('inventory')
export class InventarioController {

	constructor(
		private readonly intentoryService: InventoryService
	){}
	@Get()
	async getInventory(){
		return await this.intentoryService.getAll();
	}
	
	@Get(':id')
	async getStock(@Param('id') id: number){
		return await this.intentoryService.getStock(id);
	}

	@Post()
	async create(@Body() data: CreateInsumoDto){
		return await this.intentoryService.create(data);
	}

	@Put(':id')
	async updateStock(@Param('id') id:number, @Body() updateStockDto: UpdateStockDto){
		return await this.intentoryService.updateStock(id, updateStockDto);
	}
}
