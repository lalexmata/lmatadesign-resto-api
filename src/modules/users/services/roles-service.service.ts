import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../Entity/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from '../Dto/RoleDto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return this.roleRepository.find({ where: { id } });
  }

  async create(dto: CreateRoleDto) {
    const newRole = this.roleRepository.create(dto);
    return this.roleRepository.save(newRole);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
