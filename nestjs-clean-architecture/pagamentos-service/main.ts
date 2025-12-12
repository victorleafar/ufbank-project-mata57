/**
 * UFBank - Pagamentos Service (Microserviço)
 * 
 * Microserviço independente responsável pelo processamento de pagamentos.
 * Usa Transport.TCP para comunicação.
 * 
 * Porta TCP: 3001
 * 
 * IMPORTANTE PARA O SEMINÁRIO (Tópico 6):
 * 
 * Este é um microserviço SEPARADO da aplicação principal.
 * - NÃO expõe endpoints HTTP
 * - Comunica-se exclusivamente via protocolo TCP
 * - Usa @MessagePattern para receber mensagens
 * - Usa client.emit() para emitir eventos (EDA)
 * 
 * @description Demonstração Transport.TCP e @MessagePattern - MATA57 UFBA
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PagamentosModule } from './pagamentos.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger('Pagamentos-Service');
    
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        PagamentosModule,
        {
            transport: Transport.TCP,
            options: {
                host: process.env.PAGAMENTOS_HOST || 'localhost',
                port: parseInt(process.env.PAGAMENTOS_PORT || '3001'),
            },
        },
    );
    
    await app.listen();
}

bootstrap();
