import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserService } from '@src/use-case/services/user.service';
import { CreateUserDto, UserResponseDto } from '../dto/user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.userService.createUser(
            dto.name,
            dto.cpf,
            dto.email,
            dto.phone
        );
        return UserResponseDto.fromEntity(user);
    }

    @Get()
    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userService.findAll();
        return UserResponseDto.fromEntities(users);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.userService.findById(id);
        return UserResponseDto.fromEntity(user);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.userService.execute(id);
    }
}