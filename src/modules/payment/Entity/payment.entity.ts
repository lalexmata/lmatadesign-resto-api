import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Order } from 'src/modules/orders/Entity/orders.entity';
import { PaymentMethod } from './payment-method.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => PaymentMethod, { eager: true })
  @JoinColumn({ name: 'payment_method_id' })
  method: PaymentMethod;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn({ name: 'paid_at' })
  paidAt: Date;
}
