"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const logger = new common_1.Logger('Main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const paymentEventHost = process.env.UFBANK_EVENT_HOST || '0.0.0.0';
    const paymentEventPort = parseInt(process.env.UFBANK_EVENT_PORT || '3002');
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: paymentEventHost,
            port: paymentEventPort,
        },
    });
    await app.startAllMicroservices();
    const port = parseInt(process.env.PORT || '3000');
    await app.listen(port, '0.0.0.0');
    logger.log(`═══════════════════════════════════════════════════════════════`);
    logger.log(`UFBank API iniciada com sucesso!`);
    logger.log(`═══════════════════════════════════════════════════════════════`);
    logger.log(`HTTP Server: http://0.0.0.0:${port}`);
    logger.log(`TCP Listener: porta ${paymentEventPort} (escutando eventos)`);
    logger.log(`───────────────────────────────────────────────────────────────`);
    logger.log(`Endpoints HTTP disponíveis:`);
    logger.log(`   GET  /              - Hello World`);
    logger.log(`   GET  /ready         - Health check`);
    logger.log(`   GET  /users         - Listar usuários`);
    logger.log(`   POST /users         - Criar usuário`);
    logger.log(`   GET  /contas        - Listar contas`);
    logger.log(`   POST /contas        - Criar conta`);
    logger.log(`   GET  /contas/:id    - Buscar conta`);
    logger.log(`   POST /pagamentos    - Processar pagamento (via microserviço)`);
    logger.log(`   GET  /pagamentos    - Listar pagamentos`);
    logger.log(`───────────────────────────────────────────────────────────────`);
    logger.log(`Eventos:`);
    logger.log(`   PAGAMENTO_APROVADO  - Atualiza saldo das contas`);
    logger.log(`═══════════════════════════════════════════════════════════════`);
}
bootstrap();
