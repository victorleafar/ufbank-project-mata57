import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { UserService } from '@src/use-case/services/user.service';
import { UserRepository } from '@src/infra/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    }
  ],
  exports: [UserService]
})
export class UserModule {}