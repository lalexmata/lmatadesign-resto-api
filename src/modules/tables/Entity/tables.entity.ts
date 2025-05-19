import { Order } from 'src/modules/orders/Entity/orders.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number_table: number;

  @Column()
  capacity: number;

  @Column({
    type: 'enum',
    enum: ['Disponible', 'Ocupada', 'Reservada'],
    default: 'Disponible',
  })
  state: string;

  @OneToMany(() => Order, (pedido) => pedido.table)
  pedidos: Order[];
}
