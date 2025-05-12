import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateClientDto {
 
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    telephone: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    points?: number;
}

export class UpdateClientDto extends PartialType(CreateClientDto){}