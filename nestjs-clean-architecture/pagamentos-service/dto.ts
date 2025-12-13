export interface ProcessarPagamentoDto {
    contaOrigemId: string;
    contaDestinoId?: string;
    valor: number;
    descricao: string;
    tipo: 'PIX' | 'TED' | 'BOLETO' | 'INTERNO';
}

export interface Pagamento {
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

export interface PagamentoAprovadoEvent {
    pagamentoId: string;
    contaOrigemId: string;
    contaDestinoId?: string;
    valor: number;
    descricao: string;
    timestamp: string;
}