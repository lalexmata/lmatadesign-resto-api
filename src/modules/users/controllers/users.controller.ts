import { UsersService } from '../services/UsersService.service';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../Dto/UsersDto';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.findOne(id); // GET /users/:id
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto); // POST /users
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto); // PUT /users/:id
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.usersService.remove(id); // DELETE /users/:id
    }
}

