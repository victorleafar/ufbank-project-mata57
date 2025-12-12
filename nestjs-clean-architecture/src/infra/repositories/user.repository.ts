import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities/user.entity';
import { IUserRepository } from '@src/domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    private users: User[] = [];

    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(u => u.id === id);
        return user ?? null;
    }

    async delete(id: string): Promise<void> {
        this.users = this.users.filter(u => u.id !== id);
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return null as any;

        const current = this.users[index];
        const updated = Object.assign(current, data);
        (updated as any).updatedAt = new Date();
        this.users[index] = updated;
        return updated;
    }
}