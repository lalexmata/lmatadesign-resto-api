import { ProductInventory } from 'src/modules/products/Entity/productInventory.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  name: string;

  @Column()
  amount: number;

  @Column()
  unit: string;

  @Column({ default: 0 })
  stock_min: number;

  @Column({ type: 'tinyint', default: 1 })
  state: number; // 1 = disponible, 0 = No disponible

  @OneToMany(
    () => ProductInventory,
    (productInventory) => productInventory.insumo,
  )
  productsInventory: ProductInventory[];
}
