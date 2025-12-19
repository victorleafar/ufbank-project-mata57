import { User } from '@src/domain/entities/user.entity';
import { Account } from '../entities/account.entity';

export interface IUserRepository {
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByCpf(cpf: string): Promise<User | null>;
    delete(id: string): Promise<void>;
    update(id: string, data: Partial<User>): Promise<User>;
}

export interface IAccountRepository {
    save(account: Account): Promise<Account>;
    findAll(): Promise<Account[]>;
    findById(id: string): Promise<Account | null>;
    findByDocument(document: string): Promise<Account | null>;
    update(id: string, data: Partial<Account>): Promise<Account>;
    delete(id: string): Promise<void>;
}