import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from '@src/use-case/services/user.service';
import { CreateUserDto, UpdateUserDto } from '@src/interface/dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await this.userService.createUser(dto.name, dto.cpf, dto.email, dto.phone);
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.userService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return await this.userService.updateUser(id, dto as Partial<any>);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.execute(id);
    }
}