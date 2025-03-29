import { IsString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    user: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
