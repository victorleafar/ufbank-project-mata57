

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PagamentosController } from './pagamentos.controller';
import { PagamentosService } from './pagamentos.service';

@Module({
    imports: [
        
        ClientsModule.register([
            {
                name: 'UFBANK_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: process.env.UFBANK_HOST || 'localhost',
                    port: parseInt(process.env.UFBANK_EVENT_PORT || '3002'),
                },
            },
        ]),
    ],
    controllers: [PagamentosController],
    providers: [PagamentosService],
})
export class PagamentosModule {}
