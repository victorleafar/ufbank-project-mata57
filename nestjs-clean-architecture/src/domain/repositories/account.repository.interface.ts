import { Account } from '../entities/account.entity';

export interface IAccountRepository {
    save(account: Account): Promise<Account>;
    findAll(): Promise<Account[]>;
    findById(id: string): Promise<Account | null>;
    findByUserCpf(userCpf: string): Promise<Account | null>;
    update(id: string, data: Partial<Account>): Promise<Account>;
    delete(id: string): Promise<void>;
}