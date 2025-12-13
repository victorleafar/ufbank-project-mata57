

import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload, ClientProxy } from '@nestjs/microservices';
import { PagamentosService } from './pagamentos.service';
import { ProcessarPagamentoDto, PagamentoAprovadoEvent } from './dto';

@Controller()
export class PagamentosController {
    private readonly logger = new Logger('PagamentosController');

    constructor(
        private readonly pagamentosService: PagamentosService,
        
        /**
         * ClientProxy para emitir eventos de volta para a aplicação principal.
         * Usado para o padrão Event-Driven Architecture (EDA).
         */
        @Inject('UFBANK_SERVICE')
        private readonly ufbankClient: ClientProxy,
    ) {}

    
    @MessagePattern('PROCESSAR_PAGAMENTO')
    async processarPagamento(@Payload() dto: ProcessarPagamentoDto) {
        this.logger.log(`MENSAGEM TCP RECEBIDA: PROCESSAR_PAGAMENTO`);
        this.logger.log(`═══════════════════════════════════════════════════════`);
        this.logger.log(`Conta Origem: ${dto.contaOrigemId}`);
        this.logger.log(`Valor: R$ ${dto.valor.toFixed(2)}`);
        this.logger.log(`Tipo: ${dto.tipo}`);
        this.logger.log(`Descrição: ${dto.descricao}`);
        this.logger.log(`───────────────────────────────────────────────────────`);
        this.logger.log(`Processando pagamento...`);

        const pagamento = await this.pagamentosService.processar(dto);

        if (pagamento.status === 'APROVADO') {
            this.logger.log(`───────────────────────────────────────────────────────`);
            this.logger.log(`PAGAMENTO APROVADO! Emitindo evento...`);
            
            const evento: PagamentoAprovadoEvent = {
                pagamentoId: pagamento.id,
                contaOrigemId: dto.contaOrigemId,
                contaDestinoId: dto.contaDestinoId,
                valor: dto.valor,
                descricao: dto.descricao,
                timestamp: new Date().toISOString(),
            };
            
            this.ufbankClient.emit('PAGAMENTO_APROVADO', evento);
            
            this.logger.log(`Evento "PAGAMENTO_APROVADO" emitido!`);
            this.logger.log(`Será recebido pela aplicação principal`);
            this.logger.log(`ContaService atualizará o saldo`);
        } else {
            this.logger.log(`───────────────────────────────────────────────────────`);
            this.logger.log(`Pagamento REJEITADO`);
        }

        this.logger.log(`═══════════════════════════════════════════════════════`);
        
        return pagamento;
    }

    /**
     * @MessagePattern - Consultar pagamento por ID
     */
    @MessagePattern('CONSULTAR_PAGAMENTO')
    async consultarPagamento(@Payload() payload: { id: string }) {
        this.logger.log(`📥 MENSAGEM TCP: CONSULTAR_PAGAMENTO - ID: ${payload.id}`);
        return await this.pagamentosService.buscarPorId(payload.id);
    }

    /**
     * @MessagePattern - Listar todos os pagamentos
     */
    @MessagePattern('LISTAR_PAGAMENTOS')
    async listarPagamentos() {
        this.logger.log(`📥 MENSAGEM TCP: LISTAR_PAGAMENTOS`);
        return await this.pagamentosService.listar();
    }
}
