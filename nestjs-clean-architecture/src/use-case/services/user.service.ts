import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from '@src/domain/entities/user.entity';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository
    ) {}

    async createUser(name: string, cpf: string, email: string, phone: string): Promise<User> {
        const user = new User(
            randomUUID(),
            name,
            cpf,
            email,
            phone,
            new Date()
        );

        return await this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');

        const updated = Object.assign(user, data, { updatedAt: new Date() } as any);
        return await this.userRepository.update(id, updated);
    }

    async execute(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}