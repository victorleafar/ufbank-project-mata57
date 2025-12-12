import { Conta } from '@src/domain/entities/conta.entity';

export interface IContaRepository {
    save(conta: Conta): Promise<Conta>;
    findAll(): Promise<Conta[]>;
    findById(id: string): Promise<Conta | null>;
    findByTitularId(titularId: string): Promise<Conta[]>;
    update(id: string, data: Partial<Conta>): Promise<Conta>;
    delete(id: string): Promise<void>;
}
