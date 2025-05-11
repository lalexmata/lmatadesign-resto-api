import { Client } from "src/modules/clients/Entity/clients.entity";
import { Table } from "src/modules/tables/Entity/tables.entity";
import { User } from "src/modules/users/Entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./ordersDetail.entity";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Table, { nullable: true, eager: true }) 
  table?: Table;

  @ManyToOne(() => Client, { nullable: true, eager: true }) 
  client?: Client;

  @ManyToOne(() => User, { eager: true })
  user: User; // Mesero que tomó el pedido

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'enum', enum: ['Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Cancelado'], default: 'Pendiente' })
  state: string;

  /*@ManyToOne(() => Descuento, { nullable: true, eager: true })
  discount?: Descuento;*/

  @OneToMany(() => OrderDetail, detallePedido => detallePedido.order)
  detail: OrderDetail[];
}