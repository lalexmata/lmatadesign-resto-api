import { IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  order_id: number;

  @IsInt()
  method_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  amount: number;
}