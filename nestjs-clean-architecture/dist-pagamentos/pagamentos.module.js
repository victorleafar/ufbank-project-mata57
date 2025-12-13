"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentosModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const pagamentos_controller_1 = require("./pagamentos.controller");
const pagamentos_service_1 = require("./pagamentos.service");
let PagamentosModule = class PagamentosModule {
};
PagamentosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'UFBANK_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.UFBANK_HOST || 'localhost',
                        port: parseInt(process.env.UFBANK_EVENT_PORT || '3002'),
                    },
                },
            ]),
        ],
        controllers: [pagamentos_controller_1.PagamentosController],
        providers: [pagamentos_service_1.PagamentosService],
    })
], PagamentosModule);
exports.PagamentosModule = PagamentosModule;
//# sourceMappingURL=pagamentos.module.js.map