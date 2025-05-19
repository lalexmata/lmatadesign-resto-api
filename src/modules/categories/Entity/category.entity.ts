import { Product } from 'src/modules/products/Entity/products.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @ManyToMany(() => Product, (producto) => producto.categories)
  product: Product[];
}
