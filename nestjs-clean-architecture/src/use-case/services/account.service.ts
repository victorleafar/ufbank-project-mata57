import { Injectable, Inject, ConflictException, NotFoundException } from '@nestjs/common';
import { Account } from '@src/domain/entities/account.entity';
import { User } from '@src/domain/entities/user.entity';
import { IAccountRepository } from '@src/domain/repositories/account.repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class AccountService {
    constructor(
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository
    ) {}

    async createAccount(ownerName: string, document: string): Promise<Account> {
        const existingAccount = await this.accountRepository.findByUserCpf(document);
        if (existingAccount) {
            throw new ConflictException('Já existe uma conta com este documento');
        }

        const user = new User(randomUUID(), ownerName, document, '', '', new Date());
        const account = new Account(
            randomUUID(),
            user,
            0,
            new Date(),
            new Date()
        );

        return await this.accountRepository.save(account);
    }

    async findAll(): Promise<Account[]> {
        return await this.accountRepository.findAll();
    }

    async getAccountsByUserCpf(cpf: string): Promise<Account> {
        const account = await this.accountRepository.findByUserCpf(cpf);
        if (!account) throw new NotFoundException('Conta não encontrada');
        return account;
    }

    async findById(id: string): Promise<Account> {
        const account = await this.accountRepository.findById(id);
        if (!account) throw new NotFoundException('Conta não encontrada');
        return account;
    }

    async updateAccount(id: string, data: Partial<Account>): Promise<Account> {
        const account = await this.accountRepository.findById(id);
        if (!account) throw new NotFoundException('Conta não encontrada');

        return await this.accountRepository.update(id, data);
    }

    async deleteAccount(id: string): Promise<void> {
        await this.accountRepository.delete(id);
    }
}