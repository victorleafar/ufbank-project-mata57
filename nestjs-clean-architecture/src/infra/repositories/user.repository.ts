import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
    private users: User[] = [
        new User(
            '1',
            'João Silva Primeiro User',
            '12345678909',
            'joao@contato.com',
            '71987654321',
            new Date()
        ),
    ];

    async findAll(): Promise<User[]> {
        return [...this.users];
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
    }

    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async delete(id: string): Promise<void> {
        this.users = this.users.filter(u => u.id !== id);
    }
}