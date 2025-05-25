import { AuthGuard } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { Public } from '@auth/Decorators/public.decorator';
import { AddRolesDto } from '@users/Dto/RoleDto';
import { CreateUserDto, UpdateUserDto } from '@users/Dto/UsersDto';
import { UsersService } from '@users/services/UsersService.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return instanceToPlain(users);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const user = this.usersService.findOne(id);
    return instanceToPlain(user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const update = this.usersService.update(id, updateUserDto);
    return instanceToPlain(update);
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
