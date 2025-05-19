import { IsString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '../Entity/role.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  user: string;

  @Exclude()
  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserResponseDto {
  // Expone este campo
  @Expose()
  id: number;

  // Expone este campo
  @Expose()
  user: string;
  @Expose()
  roles: Role;
  // No necesitamos exponer el campo password aquí
}
