import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreateRoleDto, UpdateRoleDto } from '@users/Dto/RoleDto';
import { Role } from '@users/Entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const newRole = this.roleRepository.create(dto);
    return this.roleRepository.save(newRole);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete(id);
  }
}
