import { IsNumber } from "class-validator";

export class CreateTableDto {
    @IsNumber()
    number_table: number;

    @IsNumber()
    capacity: number;
}