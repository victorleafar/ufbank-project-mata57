import { Module } from '@nestjs/common';
import { UserModule } from './interface/http/user.module';
import { AccountModule } from './interface/http/account.module';

@Module({
  imports: [
    UserModule,
    AccountModule
  ],
})
export class AppModule {}
