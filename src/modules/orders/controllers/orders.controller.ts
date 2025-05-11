import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from '../Dto/ordersDto';

@Controller('orders')
export class OrdersController {

	constructor( private readonly orderService: OrdersService){}

	@Put('updateState/:id')
	async updateStateOrder(@Param('id') id: number, @Body() data: UpdateOrderDto){
		return await this.orderService.updateStateOrder(id, data);
	}

	@Post()
	async create(@Body() dataOrder: CreateOrderDto){
		return await this.orderService.createOrder(dataOrder);
	}

	@Get()
	async getall(){
		return await this.orderService.getAll();
	}
}
