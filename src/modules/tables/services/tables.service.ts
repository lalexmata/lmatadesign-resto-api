import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTableDto } from '@tables/Dto/tableDto';
import { Table } from '@tables/Entity/tables.entity';

@Injectable()
export class TablesService {
  constructor(@InjectRepository(Table) private tableRepo: Repository<Table>) {}

  async getAll() {
    return await this.tableRepo.find();
  }

  async getOne(id: number) {
    return this.tableRepo.findOne({ where: { id } });
  }

  async create(data: CreateTableDto) {
    console.log('data enviada', data);
    const newTable = this.tableRepo.create(data);

    return await this.tableRepo.save(newTable);
  }

  async update(id: number, data: any) {
    try {
      const table = await this.tableRepo.findOne({ where: { id } });
      if (!table) {
        throw new NotFoundException(`Mesa ID ${id} no encontrado`);
      }

      Object.assign(table, data);
      await this.tableRepo.save(table);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Ocurrió un error al actualizar: ${errorMessage}`);
    }
  }

  async delete(id: number) {
    try {
      const table = await this.tableRepo.findOne({ where: { id } });
      if (!table) {
        throw new NotFoundException(`Table ID ${id} no encontrado`);
      }

      await this.tableRepo.delete(id);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Ocurrió un error al eliminar: ${errorMessage}`);
    }
  }
}
