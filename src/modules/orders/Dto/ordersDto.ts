import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  table_id?: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  client_id?: number;

  @ApiProperty()
  @IsInt()
  user_id: number; // ID del mesero que toma el pedido

  @ApiProperty()
  @IsOptional()
  @IsEnum(['Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Cancelado'])
  state: 'Pendiente' | 'En Preparación' | 'Listo' | 'Entregado' | 'Cancelado';

  @ApiProperty()
  @IsOptional()
  @IsInt()
  discount_id?: number;

  @ApiProperty()
  @IsDecimal()
  @IsInt()
  total?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  observations: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  detail: CreateOrderDetailDto[];
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class CreateOrderDetailDto {
  @ApiProperty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @Min(1)
  @IsInt()
  quantity: number;

  /*@ApiProperty()
  @IsOptional()
  @IsNumber()
  subtotal: number;*/
}
