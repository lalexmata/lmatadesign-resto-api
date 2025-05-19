import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/Entity/user.entity';
import { Client } from 'src/modules/clients/Entity/clients.entity';
import { Table } from 'src/modules/tables/Entity/tables.entity';
import { OrderDetail } from './ordersDetail.entity';

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
    enum: ['Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Cancelado'],
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
}
