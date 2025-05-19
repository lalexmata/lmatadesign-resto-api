import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsString } from 'class-validator';
export class CreateRoleDto {
  @IsString()
  name: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

export class AddRolesDto {
  @IsArray()
  @IsString({ each: true })
  roleNames: string[]; // Lista de nombres de roles a agregar
}
