import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 3002,
        },
    });

  await app.startAllMicroservices();

  await app.listen(3000);

    logger.log(`═══════════════════════════════════════════════════════════════`);
    logger.log(`UFBank API iniciada com sucesso!`);
    logger.log(`═══════════════════════════════════════════════════════════════`);
    logger.log(`HTTP Server: http://localhost:${3000}`);
    logger.log(`TCP Listener: porta 3002 (escutando eventos)`);
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