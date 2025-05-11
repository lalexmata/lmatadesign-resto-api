import { Type } from "class-transformer";
import { IsArray, IsDecimal, IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateOrderDto {
  @IsOptional()
  @IsInt()
  table_id?: number;

  @IsOptional()
  @IsInt()
  client_id?: number;

  @IsInt()
  user_id: number; // ID del mesero que toma el pedido
  
  @IsOptional()
  @IsEnum(['Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Cancelado'])
  state: 'Pendiente' | 'En Preparación' | 'Listo' | 'Entregado' | 'Cancelado';

  @IsOptional()
  @IsInt()
  discount_id?: number;

  @IsDecimal()
  @IsInt()
  total?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  detail: CreateOrderDetailDto[];

}
export class UpdateOrderDto {
  @IsString()
  @IsIn(['Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Cancelado'])
  state: string;
}

export class CreateOrderDetailDto {
  @IsInt()
  product_id: number;

  @IsInt()
  quantity: number;

  @IsOptional()
  @IsNumber()
  subtotal: number;
}