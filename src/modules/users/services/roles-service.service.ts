import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../Entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesServiceService {
	constructor(
		@InjectRepository(Role)
		private roleRepository: Repository<Role>
	){}

	async findAll(){
		return this.roleRepository.find();
	}

	async findOne(id: number){
		return this.roleRepository.find({where: {id}});
	}

	asunc create()

}
