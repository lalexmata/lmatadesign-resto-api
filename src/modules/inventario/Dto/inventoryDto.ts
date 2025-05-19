import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInsumoDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @MaxLength(50)
  unite: string; // Ejemplo: "Kg", "Litros", "Unidades"

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock_min?: number;
}

export class UpdateStockDto {
  @IsNumber()
  @Min(-1000) // Permite reducir stock hasta -1000
  amount: number;
}
