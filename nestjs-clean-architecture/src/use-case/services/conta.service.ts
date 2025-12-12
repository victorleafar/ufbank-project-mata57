import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { Conta } from '@src/domain/entities/conta.entity';
import { IContaRepository } from '@src/domain/repositories/conta.repository.interface';
import { randomUUID } from 'crypto';
import { PagamentoAprovadoEvent } from '@src/interface/dto/pagamento.dto';

@Injectable()
export class ContaService {
    private readonly logger = new Logger('ContaService');

    constructor(
        @Inject('IContaRepository')
        private readonly contaRepository: IContaRepository
    ) {}

    async criar(titularId: string, titular: string, saldoInicial: number = 0): Promise<Conta> {
        const conta = new Conta(
            randomUUID(),
            titularId,
            titular,
            saldoInicial,
            new Date(),
            new Date()
        );

        return await this.contaRepository.save(conta);
    }

    async findAll(): Promise<Conta[]> {
        return await this.contaRepository.findAll();
    }

    async findById(id: string): Promise<Conta> {
        const conta = await this.contaRepository.findById(id);
        if (!conta) throw new NotFoundException('Conta não encontrada');
        return conta;
    }

    async processarPagamentoAprovado(evento: PagamentoAprovadoEvent): Promise<void> {
        this.logger.log(`Processando PAGAMENTO`);
        this.logger.log(`Pagamento: ${evento.pagamentoId}`);
        this.logger.log(`Valor: R$ ${evento.valor.toFixed(2)}`);

        
        const contaOrigem = await this.contaRepository.findById(evento.contaOrigemId);
        if (contaOrigem) {
            contaOrigem.debitar(evento.valor);
            await this.contaRepository.update(contaOrigem.id, contaOrigem);
            this.logger.log(`Debitado R$ ${evento.valor.toFixed(2)} da conta ${contaOrigem.id}`);
            this.logger.log(`Novo saldo: R$ ${contaOrigem.saldo.toFixed(2)}`);
        }

        if (evento.contaDestinoId) {
            const contaDestino = await this.contaRepository.findById(evento.contaDestinoId);
            if (contaDestino) {
                contaDestino.creditar(evento.valor);
                await this.contaRepository.update(contaDestino.id, contaDestino);
                this.logger.log(`Creditado R$ ${evento.valor.toFixed(2)} na conta ${contaDestino.id}`);
                this.logger.log(`Novo saldo: R$ ${contaDestino.saldo.toFixed(2)}`);
            }
        }
    }
}
