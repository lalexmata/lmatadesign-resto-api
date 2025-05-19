import { UsersService } from '../services/UsersService.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../Dto/UsersDto';
import { Public } from 'src/modules/auth/Decorators/public.decorator';
import { AddRolesDto } from '../Dto/RoleDto';
import { classToPlain } from 'class-transformer';

//@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return classToPlain(users);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const user = this.usersService.findOne(id);
    return classToPlain(user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const update = this.usersService.update(id, updateUserDto);
    return classToPlain(update);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Public() // Esta ruta será pública
  @Get('public')
  getPublicData() {
    return { message: 'Esta ruta es pública' };
  }

  @Put(':id/roles')
  async addRolesToUser(
    @Param('id') userId: number, // ID del usuario
    @Body() addRolesDto: AddRolesDto, // Roles que se agregarán
  ) {
    return this.usersService.addRolesToUser(userId, addRolesDto);
  }
}
