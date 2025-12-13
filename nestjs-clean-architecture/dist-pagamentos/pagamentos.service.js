"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentosService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let PagamentosService = class PagamentosService {
    constructor() {
        this.logger = new common_1.Logger('PagamentosService');
        this.pagamentos = new Map();
    }
    async processar(dto) {
        const pagamento = {
            id: (0, crypto_1.randomUUID)(),
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
    async buscarPorId(id) {
        return this.pagamentos.get(id) || null;
    }
    async listar() {
        return Array.from(this.pagamentos.values());
    }
};
PagamentosService = __decorate([
    (0, common_1.Injectable)()
], PagamentosService);
exports.PagamentosService = PagamentosService;
//# sourceMappingURL=pagamentos.service.js.map