/**
 * DTOs para comunicação com o Microserviço de Pagamentos
 * 
 * Estes DTOs definem o contrato de comunicação entre o
 * projeto principal (API Gateway) e o Pagamentos Service.
 */

export class ProcessarPagamentoDto {
    contaOrigemId!: string;
    contaDestinoId?: string;
    valor!: number;
    descricao!: string;
    tipo!: 'PIX' | 'TED' | 'BOLETO' | 'INTERNO';
}

export class PagamentoResponseDto {
    id!: string;
    contaOrigemId!: string;
    contaDestinoId?: string;
    valor!: number;
    descricao!: string;
    tipo!: string;
    status!: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
    criadoEm!: string;
    processadoEm?: string;
}

/**
 * Evento emitido quando um pagamento é aprovado.
 * O serviço principal escuta esse evento para atualizar o saldo.
 */
export class PagamentoAprovadoEvent {
    pagamentoId!: string;
    contaOrigemId!: string;
    contaDestinoId?: string;
    valor!: number;
    descricao!: string;
    timestamp!: string;
}
