import { Client } from '@clients/Entity/clients.entity';
import { Table } from '@tables/Entity/tables.entity';
import { User } from '@users/Entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './ordersDetail.entity';
import { Payment } from '@modules/payment/Entity/payment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Table, { nullable: true, eager: true })
  @JoinColumn({ name: 'table_id' })
  table?: Table;

  @ManyToOne(() => Client, { nullable: true, eager: true })
  @JoinColumn({ name: 'client_id' })
  client?: Client;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({
    type: 'enum',
    enum: ['Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Cancelado', 'Pagada'],
    default: 'Pendiente',
  })
  state: string;

  @Column({ type: 'text', nullable: true })
  observations: string;

  @Column({ default: 0, name: 'inventory_processed' })
  inventoryProcessed: number;

  @OneToMany(() => OrderDetail, (detail) => detail.order, {
    cascade: true,
    eager: true,
  })
  detail: OrderDetail[];

  @OneToMany(() => Payment, payment => payment.order, { cascade: true })
  payments: Payment[];
}
