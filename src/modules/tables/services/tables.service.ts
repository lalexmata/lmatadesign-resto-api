import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../Entity/tables.entity';
import { throwError } from 'rxjs';
import { CreateTableDto } from '../Dto/tableDto';

@Injectable()
export class TablesService {

    constructor(
        @InjectRepository(Table) private tableRepo: Repository<Table>
    ){}

    async getAll(){
        return await this.tableRepo.find();
    }

    async getOne(id: number){
        return this.tableRepo.findOne({where: { id}});
    }

    async create(data: CreateTableDto){
        console.log('data enviada', data);
        const newTable = await this.tableRepo.create(data);

        return await this.tableRepo.save(newTable);
    }

    async update(id: number, data: any){
        try {
            const table= await this.tableRepo.findOne({where: {id}});
        if(!table) {
            throw new NotFoundException(
                `Mesa ID ${id} no encontrado`,
            );
        }

        Object.assign(table, data);
        await this.tableRepo.save(table);

        } catch (error) {
            throw new Error('Ocurrió un error al actualizar', error);
        }
        
    }

    async delete(id: number){
        try {
            const table= await this.tableRepo.findOne({where: {id}});
        if(!table) {
            throw new NotFoundException(
                `Table ID ${id} no encontrado`,
            );
        }

        await this.tableRepo.delete(id);

        } catch (error) {
            throw new Error('Ocurrió un error al actualizar', error);
        }
    }
}
