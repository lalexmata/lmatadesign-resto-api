import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, isDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

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

    @IsString()
    @IsOptional()
    image?: string; 

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductIngredientDto)
    ingredients: ProductIngredientDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto){}

export class ProductIngredientDto {
    inventory_id: number;
    quantity_used: number;
}