"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentosController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const pagamentos_service_1 = require("./pagamentos.service");
let PagamentosController = class PagamentosController {
    constructor(pagamentosService, ufbankClient) {
        this.pagamentosService = pagamentosService;
        this.ufbankClient = ufbankClient;
        this.logger = new common_1.Logger('PagamentosController');
    }
    async processarPagamento(dto) {
        this.logger.log(`═══════════════════════════════════════════════════════`);
        this.logger.log(`📥 MENSAGEM TCP RECEBIDA: PROCESSAR_PAGAMENTO`);
        this.logger.log(`═══════════════════════════════════════════════════════`);
        this.logger.log(`   Conta Origem: ${dto.contaOrigemId}`);
        this.logger.log(`   Valor: R$ ${dto.valor.toFixed(2)}`);
        this.logger.log(`   Tipo: ${dto.tipo}`);
        this.logger.log(`   Descrição: ${dto.descricao}`);
        this.logger.log(`───────────────────────────────────────────────────────`);
        this.logger.log(`🔄 Processando pagamento...`);
        const pagamento = await this.pagamentosService.processar(dto);
        if (pagamento.status === 'APROVADO') {
            this.logger.log(`───────────────────────────────────────────────────────`);
            this.logger.log(`🎉 PAGAMENTO APROVADO! Emitindo evento...`);
            const evento = {
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
        }
        else {
            this.logger.log(`───────────────────────────────────────────────────────`);
            this.logger.log(`❌ Pagamento REJEITADO`);
        }
        this.logger.log(`═══════════════════════════════════════════════════════`);
        return pagamento;
    }
    async consultarPagamento(payload) {
        this.logger.log(`📥 MENSAGEM TCP: CONSULTAR_PAGAMENTO - ID: ${payload.id}`);
        return await this.pagamentosService.buscarPorId(payload.id);
    }
    async listarPagamentos() {
        this.logger.log(`📥 MENSAGEM TCP: LISTAR_PAGAMENTOS`);
        return await this.pagamentosService.listar();
    }
};
__decorate([
    (0, microservices_1.MessagePattern)('PROCESSAR_PAGAMENTO'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "processarPagamento", null);
__decorate([
    (0, microservices_1.MessagePattern)('CONSULTAR_PAGAMENTO'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "consultarPagamento", null);
__decorate([
    (0, microservices_1.MessagePattern)('LISTAR_PAGAMENTOS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagamentosController.prototype, "listarPagamentos", null);
PagamentosController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('UFBANK_SERVICE')),
    __metadata("design:paramtypes", [pagamentos_service_1.PagamentosService,
        microservices_1.ClientProxy])
], PagamentosController);
exports.PagamentosController = PagamentosController;
//# sourceMappingURL=pagamentos.controller.js.map