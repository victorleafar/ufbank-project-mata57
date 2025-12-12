/**
 * UFBank - Pagamentos Controller (Microserviço)
 * 
 * Controller que recebe mensagens TCP usando @MessagePattern
 * e emite eventos usando client.emit().
 * 
 * IMPORTANTE PARA O SEMINÁRIO (Tópico 6):
 * 
 * DIFERENÇA ENTRE @Get/@Post e @MessagePattern:
 * 
 * No API Gateway (HTTP):
 *   @Get(), @Post() → Decorators para rotas HTTP
 *   
 * No Microserviço (TCP):
 *   @MessagePattern() → Para mensagens síncronas (request/response)
 *   @EventPattern() → Para eventos assíncronos (fire-and-forget)
 * 
 * DIFERENÇA ENTRE send() e emit():
 * 
 * client.send(pattern, data)
 *   - Síncrono: aguarda resposta
 *   - Usa @MessagePattern no receptor
 * 
 * client.emit(pattern, data)
 *   - Assíncrono: NÃO aguarda resposta (fire-and-forget)
 *   - Usa @EventPattern no receptor
 *   - Ideal para eventos como "PAGAMENTO_APROVADO"
 * 
 * @description Demonstração @MessagePattern e client.emit() - MATA57 UFBA
 */

import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload, ClientProxy } from '@nestjs/microservices';
import { PagamentosService } from './pagamentos.service';

// Interfaces para tipagem
interface ProcessarPagamentoDto {
    contaOrigemId: string;
    contaDestinoId?: string;
    valor: number;
    descricao: string;
    tipo: 'PIX' | 'TED' | 'BOLETO' | 'INTERNO';
}

interface PagamentoAprovadoEvent {
    pagamentoId: string;
    contaOrigemId: string;
    contaDestinoId?: string;
    valor: number;
    descricao: string;
    timestamp: string;
}

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

    /**
     * @MessagePattern - Padrão Request/Response
     * 
     * Recebe a mensagem 'PROCESSAR_PAGAMENTO' do API Gateway
     * e retorna o resultado do processamento.
     * 
     * FLUXO COMPLETO (EDA):
     * 1. API Gateway envia 'PROCESSAR_PAGAMENTO' via TCP
     * 2. Este método processa o pagamento
     * 3. Se aprovado, emite evento 'PAGAMENTO_APROVADO'
     * 4. Aplicação principal recebe via @EventPattern
     * 5. ContaService atualiza o saldo
     */
    @MessagePattern('PROCESSAR_PAGAMENTO')
    async processarPagamento(@Payload() dto: ProcessarPagamentoDto) {
        this.logger.log(`═══════════════════════════════════════════════════════`);
        this.logger.log(`📥 MENSAGEM TCP RECEBIDA: PROCESSAR_PAGAMENTO`);
        this.logger.log(`═══════════════════════════════════════════════════════`);
        this.logger.log(`   Conta Origem: ${dto.contaOrigemId}`);
        this.logger.log(`   Valor: R$ ${dto.valor.toFixed(2)}`);
        this.logger.log(`   Tipo: ${dto.tipo}`);
        this.logger.log(`   Descrição: ${dto.descricao}`);
        this.logger.log(`───────────────────────────────────────────────────────`);
        this.logger.log(`🔄 Processando pagamento...`);

        // Processa o pagamento
        const pagamento = await this.pagamentosService.processar(dto);

        // Se o pagamento foi aprovado, emite o evento
        if (pagamento.status === 'APROVADO') {
            this.logger.log(`───────────────────────────────────────────────────────`);
            this.logger.log(`🎉 PAGAMENTO APROVADO! Emitindo evento...`);
            
            /**
             * client.emit() - Emissão de evento (Fire and Forget)
             * 
             * - Primeiro parâmetro: nome do evento
             * - Segundo parâmetro: payload do evento
             * 
             * A aplicação principal receberá este evento via
             * @EventPattern('PAGAMENTO_APROVADO') no ContaController
             * e atualizará o saldo das contas.
             */
            const evento: PagamentoAprovadoEvent = {
                pagamentoId: pagamento.id,
                contaOrigemId: dto.contaOrigemId,
                contaDestinoId: dto.contaDestinoId,
                valor: dto.valor,
                descricao: dto.descricao,
                timestamp: new Date().toISOString(),
            };
            
            this.ufbankClient.emit('PAGAMENTO_APROVADO', evento);
            
            this.logger.log(`📤 Evento "PAGAMENTO_APROVADO" emitido!`);
            this.logger.log(`   → Será recebido pela aplicação principal`);
            this.logger.log(`   → ContaService atualizará o saldo`);
        } else {
            this.logger.log(`───────────────────────────────────────────────────────`);
            this.logger.log(`❌ Pagamento REJEITADO`);
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
