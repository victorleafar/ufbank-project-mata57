import { Module } from '@nestjs/common';
import { AccountController } from '../controllers/account.controller';
import { AccountService } from '@src/use-case/services/account.service';
import { AccountRepository } from '@src/infra/repositories/account.repository';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository
    }
  ],
  exports: [AccountService]
})
export class AccountModule {}