import { Injectable, Logger } from '@nestjs/common';
import { Conta } from '@src/domain/entities/conta.entity';
import { IContaRepository } from '@src/domain/repositories/conta.repository.interface';

@Injectable()
export class ContaRepository implements IContaRepository {
    private readonly logger = new Logger('ContaRepository');
    private contas: Conta[] = [];

    constructor() {
        // Dados de demonstração para o seminário
        this.seedDemoData();
    }

    private seedDemoData(): void {
        const contasDemo = [
            new Conta('conta-001', 'user-001', 'João Silva', 5000.00, new Date(), new Date()),
            new Conta('conta-002', 'user-002', 'Maria Santos', 3000.00, new Date(), new Date()),
        ];
        this.contas = contasDemo;
        this.logger.log(`${contasDemo.length} contas de demonstração criadas`);
    }

    async save(conta: Conta): Promise<Conta> {
        this.contas.push(conta);
        return conta;
    }

    async findAll(): Promise<Conta[]> {
        return this.contas;
    }

    async findById(id: string): Promise<Conta | null> {
        return this.contas.find(c => c.id === id) ?? null;
    }

    async findByTitularId(titularId: string): Promise<Conta[]> {
        return this.contas.filter(c => c.titularId === titularId);
    }

    async update(id: string, data: Partial<Conta>): Promise<Conta> {
        const index = this.contas.findIndex(c => c.id === id);
        if (index === -1) return null as any;

        const current = this.contas[index];
        Object.assign(current, data);
        current.atualizadaEm = new Date();
        return current;
    }

    async delete(id: string): Promise<void> {
        this.contas = this.contas.filter(c => c.id !== id);
    }
}
