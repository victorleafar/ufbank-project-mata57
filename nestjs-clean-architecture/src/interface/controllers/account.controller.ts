import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { AccountService } from '@src/use-case/services/account.service';
import { CreateAccountDto, UpdateAccountDto } from '@src/interface/dto/account.dto';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateAccountDto) {
        const account = await this.accountService.createAccount(dto.ownerName, dto.document);
        return {
            accountId: account.id,
            ownerName: account.getOwnerName(),
            document: account.getDocument(),
            balance: account.balance
        };
    }

    @Get()
    async findAll() {
        return await this.accountService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.accountService.findById(id);
    }

    @Get('user/:userCpf')
    async findByUserCpf(@Param('userCpf') userCpf: string) {
        return await this.accountService.getAccountsByUserCpf(userCpf);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateAccountDto) {
        return await this.accountService.updateAccount(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.accountService.deleteAccount(id);
    }
}