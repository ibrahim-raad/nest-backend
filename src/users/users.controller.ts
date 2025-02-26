import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:  UsersService) {}

        @Get()
        async findAll(): Promise<User[]> {
            return await this.usersService.findall();
        }

        @Get(':id')
        async findOne(@Param('id') id:string): Promise<User> {
            const user = await this.usersService.findOne(id);
            if (!user) {
                throw new Error('User not found');
            } else {
                return user;
            }

        }

        @Post() 
        async create(@Body() user: User): Promise<User> {
            return await this.usersService.create(user);
        }

        @Put(':id')
        async update(@Param('id') id: string, @Body() user: User): Promise<User> {
            return this.usersService.update(id, user);
        }

        @Delete(':id' )
        async delete(@Param('id') id:string): Promise<void> {
            
            const user = await this.usersService.findOne(id);
            if (!user) {
            throw new Error('user not found')
        } 
        return this.usersService.delete(id);
    }
    
}
