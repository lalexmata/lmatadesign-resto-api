import { Inventory } from '@inventario/Entity/inventory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@Entity('products_inventory')
export class ProductInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (producto) => producto.productsInventory, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Inventory, (insumo) => insumo.productsInventory, {
    onDelete: 'CASCADE',
  })
  insumo: Inventory;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity_used: number; // Cantidad de insumo necesario
}
