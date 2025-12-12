
import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

interface ProcessarPagamentoDto {
    contaOrigemId: string;
    contaDestinoId?: string;
    valor: number;
    descricao: string;
    tipo: 'PIX' | 'TED' | 'BOLETO' | 'INTERNO';
}

interface Pagamento {
    id: string;
    contaOrigemId: string;
    contaDestinoId?: string;
    valor: number;
    descricao: string;
    tipo: string;
    status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
    criadoEm: string;
    processadoEm?: string;
}

@Injectable()
export class PagamentosService {
    private readonly logger = new Logger('PagamentosService');
    
    
    private pagamentos: Map<string, Pagamento> = new Map();

    async processar(dto: ProcessarPagamentoDto): Promise<Pagamento> {
        
        const pagamento: Pagamento = {
            id: randomUUID(),
            contaOrigemId: dto.contaOrigemId,
            contaDestinoId: dto.contaDestinoId,
            valor: dto.valor,
            descricao: dto.descricao,
            tipo: dto.tipo,
            status: 'PENDENTE',
            criadoEm: new Date().toISOString(),
        };

        
        if (dto.valor <= 0) {
            pagamento.status = 'REJEITADO';
            this.logger.warn(`Rejeitado: valor deve ser maior que zero`);
            this.pagamentos.set(pagamento.id, pagamento);
            return pagamento;
        }

        if (dto.valor > 10000) {
            pagamento.status = 'REJEITADO';
            this.logger.warn(`Rejeitado: valor excede limite de R$ 10.000,00`);
            this.pagamentos.set(pagamento.id, pagamento);
            return pagamento;
        }

        if (!dto.contaOrigemId) {
            pagamento.status = 'REJEITADO';
            this.logger.warn(`Rejeitado: conta de origem não informada`);
            this.pagamentos.set(pagamento.id, pagamento);
            return pagamento;
        }

        
        pagamento.status = 'APROVADO';
        pagamento.processadoEm = new Date().toISOString();
        
        this.logger.log(`Pagamento APROVADO!`);

        this.pagamentos.set(pagamento.id, pagamento);
        
        return pagamento;
    }

    async buscarPorId(id: string): Promise<Pagamento | null> {
        return this.pagamentos.get(id) || null;
    }

    async listar(): Promise<Pagamento[]> {
        return Array.from(this.pagamentos.values());
    }
}
