import { User } from '@src/domain/entities/user.entity';

export interface IUserRepository {
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    update(id: string, data: Partial<User>): Promise<User>;
}