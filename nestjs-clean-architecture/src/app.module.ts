import { Module } from '@nestjs/common';
import { AppController } from './interface/controllers/app.controller';
import { AppService } from './use-case/services/app.service';
import { UserController } from './interface/controllers/user.controller';
import { UserService } from './use-case/services/user.service';
import { UserRepository } from './infra/repositories/user.repository';

@Module({
    imports: [],
    controllers: [AppController, UserController],
    providers: [AppService, UserService, {
            provide: 'IUserRepository',
            useClass: UserRepository,
        },],
})
export class AppModule {}
