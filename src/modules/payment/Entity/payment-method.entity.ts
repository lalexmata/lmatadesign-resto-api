import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./payment.entity";

@Entity('payment_methods')
export class PaymentMethod {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // Ej: 'Efectivo', 'Tarjeta', 'Transferencia'

  @OneToMany(() => Payment, payment => payment.method)
  payments: Payment[];
}