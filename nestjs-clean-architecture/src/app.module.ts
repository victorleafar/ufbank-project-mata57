import { Module } from '@nestjs/common';
import { AppController } from './interface/controllers/app.controller';
import { AppService } from './use-case/services/app.service';
import { UserController } from './interface/controllers/user.controller';
import { UserService } from './use-case/services/user.service';
import { UserRepository } from './infra/repositories/user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ContaRepository } from './infra/repositories/conta.repository';
import { ContaService } from './use-case/services/conta.service';
import { ContaController } from './interface/controllers/conta.controller';
import { PagamentoController } from './interface/controllers/pagamento.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PAGAMENTOS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: process.env.PAGAMENTOS_HOST || 'localhost',
                    port: parseInt(process.env.PAGAMENTOS_PORT || '3001'),
                },
            },
        ]),
    ],
    controllers: [AppController, UserController, 
        ContaController,
        PagamentoController],
    providers: [AppService, UserService, 
        ContaService,
        {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },
        {
            provide: 'IContaRepository',
            useClass: ContaRepository,
        },
    ],
})
export class AppModule {}
