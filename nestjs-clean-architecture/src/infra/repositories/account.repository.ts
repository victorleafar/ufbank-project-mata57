import { Injectable } from '@nestjs/common';
import { Account } from '@src/domain/entities/account.entity';
import { IAccountRepository } from '@src/domain/repositories/account.repository.interface';

@Injectable()
export class AccountRepository implements IAccountRepository {
    private accounts: Account[] = [];

    async save(account: Account): Promise<Account> {
        this.accounts.push(account);
        return account;
    }

    async findAll(): Promise<Account[]> {
        return this.accounts;
    }

    async findById(id: string): Promise<Account | null> {
        return this.accounts.find(acc => acc.id === id) || null;
    }

    async findByUserCpf(userCpf: string): Promise<Account | null> {
        return this.accounts.find(acc => acc.user.cpf === userCpf) || null;
    }

    async update(id: string, data: Partial<Account>): Promise<Account> {
        const index = this.accounts.findIndex(acc => acc.id === id);
        if (index === -1) return null as any;
        
        const updatedAccount = {
            ...this.accounts[index],
            ...data,
            getOwnerName: this.accounts[index].getOwnerName,
            getDocument: this.accounts[index].getDocument,
        };
        this.accounts[index] = updatedAccount;
        return this.accounts[index];
    }

    async delete(id: string): Promise<void> {
        this.accounts = this.accounts.filter(acc => acc.id !== id);
    }
}