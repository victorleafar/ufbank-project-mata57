"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const pagamentos_module_1 = require("./pagamentos.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Pagamentos-Service');
    const app = await core_1.NestFactory.createMicroservice(pagamentos_module_1.PagamentosModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.PAGAMENTOS_HOST || 'localhost',
            port: parseInt(process.env.PAGAMENTOS_PORT || '3001'),
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map