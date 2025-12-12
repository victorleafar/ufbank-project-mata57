import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../../use-case/services/app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('/health')
    getHealth(@Body() isHealth: number[]): string {
        return this.appService.getHealth(isHealth);
    }

    @Get('ready')
    getReady(): string {
        return 'READY';
    }
}
