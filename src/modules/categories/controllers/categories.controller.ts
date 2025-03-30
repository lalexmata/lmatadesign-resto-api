import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../Dto/categoryDto';
import { JwtAuthGuard } from 'src/modules/auth/Guards/jwt-auth.guard';
import { Public } from 'src/modules/auth/Decorators/public.decorator';

//@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {

	constructor(
		private categoryService: CategoriesService
	){}

	@Public()
	@Get()
	findAll(){
		return this.categoryService.findAll();
	}
	@Public()
	@Get(':id')
	findOne(@Param('id') id: number){
		return this.categoryService.findOne(id);
	}

	@Post()
	create(@Body() data: CreateCategoryDto){
		return this.categoryService.create(data);
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() data: UpdateCategoryDto){
		return this.categoryService.update(id, data);
	}

	@Delete(':id')
	remove(@Param('id') id: number){
		return this.categoryService.remove(id);
	}

}
