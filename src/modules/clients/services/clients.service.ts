import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateClientDto, UpdateClientDto } from '@clients/Dto/ClientDto';
import { Client } from '@clients/Entity/clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
  ) {}

  async getAll() {
    return await this.clientRepo.find();
  }

  async getOne(id: number) {
    return await this.clientRepo.find({ where: { id: id } });
  }

  async create(data: CreateClientDto) {
    const newClient = this.clientRepo.create(data);
    return await this.clientRepo.save(newClient);
  }

  async update(id: number, data: UpdateClientDto) {
    const client = await this.clientRepo.findOne({ where: { id } });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    // Asignar nuevos valores al cliente
    Object.assign(client, data);

    // Guardar cambios
    return await this.clientRepo.save(client);
  }

  async delete(id: number) {
    const client = await this.getOne(id);
    if (!client)
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);

    return await this.clientRepo.delete({ id: id });
  }
}
