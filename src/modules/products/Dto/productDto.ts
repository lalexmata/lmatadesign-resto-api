import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsBoolean, isDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsArray()
    @IsNotEmpty()
    category_ids: number[];

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsBoolean()
    @IsOptional()
    state?: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto){}