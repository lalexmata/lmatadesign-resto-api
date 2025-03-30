import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../Dto/UsersDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../Entity/role.entity';
import { AddRolesDto } from '../Dto/RoleDto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ){}
    
  async findAll(): Promise<User[]> {
    return this.userRepository.find({relations: ['roles']});
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  async findByEmail(email: string){
    return this.userRepository.findOne({ where: {email}, relations: ['roles']});
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return false;
    
    return await bcrypt.compare(password, user.password); // 👈 Compara la contraseña ingresada con la encriptada
  }

  async addRolesToUser(userId: number, addRolesDto: AddRolesDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],  // Cargar roles actuales del usuario
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Busca los roles que se desean agregar
    const roles = await this.roleRepository.findBy({
      name: In(addRolesDto.roleNames),  // Utiliza `In()` para buscar múltiples roles
    });

    if (roles.length === 0) {
      throw new Error('Roles not found');
    }

    // Agrega los roles al usuario
    user.roles = [...user.roles, ...roles];

    // Guarda los cambios en la base de datos
    await this.userRepository.save(user);

    return user;  // Devuelve el usuario actualizado
  }
}
