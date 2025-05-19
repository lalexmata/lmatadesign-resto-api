import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from '../Entity/inventory.entity';
import { Repository } from 'typeorm';
import { CreateInsumoDto, UpdateStockDto } from '../Dto/inventoryDto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private intentoryRepository: Repository<Inventory>,
  ) {}

  async getAll() {
    return this.intentoryRepository.find();
  }

  async getStock(id: number) {
    return this.intentoryRepository.find({
      where: { id },
      select: ['id', 'name', 'amount', 'unit'],
    });
  }

  async create(createInsumoDto: CreateInsumoDto) {
    const nuevoInsumo = this.intentoryRepository.create({
      ...createInsumoDto,
      stock_min: createInsumoDto.stock_min || 0, // Valor por defecto
      state: createInsumoDto.amount > (createInsumoDto.stock_min || 0) ? 1 : 0, // Si tiene más stock del mínimo, está disponible
    });

    await this.intentoryRepository.save(nuevoInsumo);
    return { message: 'Insumo agregado correctamente', insumo: nuevoInsumo };
  }

  async updateStock(id: number, dataUpdate: UpdateStockDto) {
    const insumo = await this.intentoryRepository.findOne({ where: { id } });

    if (!insumo) {
      throw new NotFoundException(`Insumo con ID ${id} no encontrado`);
    }

    if (dataUpdate.amount === 0) {
      throw new BadRequestException(`La cantidad debe ser mayor o menor a 0`);
    }

    // Ajustar stock
    insumo.amount += dataUpdate.amount;

    // Si el stock es menor al mínimo, cambiar estado a "No disponible"
    insumo.state = insumo.amount < insumo.stock_min ? 0 : 1;

    await this.intentoryRepository.save(insumo);

    return {
      message: `Stock actualizado correctamente. Nuevo stock: ${insumo.amount}`,
      estado: insumo.state ? 'Disponible' : 'No Disponible',
    };
  }
}
