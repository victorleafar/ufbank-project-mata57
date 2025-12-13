"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./interface/controllers/app.controller");
const app_service_1 = require("./use-case/services/app.service");
const user_controller_1 = require("./interface/controllers/user.controller");
const user_service_1 = require("./use-case/services/user.service");
const user_repository_1 = require("./infra/repositories/user.repository");
const microservices_1 = require("@nestjs/microservices");
const conta_repository_1 = require("./infra/repositories/conta.repository");
const conta_service_1 = require("./use-case/services/conta.service");
const conta_controller_1 = require("./interface/controllers/conta.controller");
const pagamento_controller_1 = require("./interface/controllers/pagamento.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'PAGAMENTOS_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.PAGAMENTOS_HOST || 'localhost',
                        port: parseInt(process.env.PAGAMENTOS_PORT || '3001'),
                    },
                },
            ]),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController,
            conta_controller_1.ContaController,
            pagamento_controller_1.PagamentoController],
        providers: [app_service_1.AppService, user_service_1.UserService,
            conta_service_1.ContaService,
            {
                provide: 'IUserRepository',
                useClass: user_repository_1.UserRepository,
            },
            {
                provide: 'IContaRepository',
                useClass: conta_repository_1.ContaRepository,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
