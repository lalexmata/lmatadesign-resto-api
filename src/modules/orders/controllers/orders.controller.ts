import { Body, Controller, Param, Post, Put, Get, Delete } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../Dto/ordersDto';

@Controller('orders')
export class OrdersController {

	constructor( private readonly orderService: OrdersService){}

	@Put('updateState/:id')
	async updateStateOrder(@Param('id') id: number, @Body() data: UpdateOrderDto){
		return await this.orderService.updateOrder(id, data);
	}

	@Post()
	async create(@Body() dataOrder: CreateOrderDto){
		return await this.orderService.createOrder(dataOrder);
	}

	@Put(':id')
	async update(@Param('id') id: number, @Body() data: UpdateOrderDto){
		return await this.orderService.updateOrder(id, data);
	}

	@Get()
	async getall(){
		return await this.orderService.getAll();
	}

	@Get(':id')
	async getOne(@Param('id') id: number) {
		return this.orderService.getOne(id);
	}

	@Delete(':id')
	async deleteOrder(@Param('id') id: number){
		return this.orderService.deleteOrder(id);
	}
}
