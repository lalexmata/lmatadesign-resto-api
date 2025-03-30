import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from '../services/roles-service.service';
import { CreateRoleDto, UpdateRoleDto } from '../Dto/RoleDto';
import { throwError } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/Guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {

	constructor(
		private readonly rolesService: RolesService
	){}

	@Get()
	findAll(){
		return this.rolesService.findAll();
	}

	@Post()
	create(@Body() data: CreateRoleDto){
		return this.rolesService.create(data);       
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() data: UpdateRoleDto){
		return this.rolesService.update(id, data);
	}

	@Delete(':id')
	delete(@Param('id') id: number){
		return this.rolesService.remove(id);
	}

}
