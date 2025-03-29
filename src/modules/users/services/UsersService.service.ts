import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../Dto/UsersDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
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
}
