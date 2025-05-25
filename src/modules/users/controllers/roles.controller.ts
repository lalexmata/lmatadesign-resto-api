import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateRoleDto, UpdateRoleDto } from '@users/Dto/RoleDto';
import { Role } from '@users/Entity/role.entity';
import { RolesService } from '@users/services/roles-service.service';
import { DeleteResult } from 'typeorm';

@Controller('roles')
@UseGuards(AuthGuard('jwt'))
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Post()
  create(@Body() data: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateRoleDto,
  ): Promise<Role | null> {
    return this.rolesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.rolesService.remove(id);
  }
}
