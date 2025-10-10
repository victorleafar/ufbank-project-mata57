import { Controller, Get } from '@nestjs/common';
// Update the path below to the correct relative location of app.service.ts
import { AppService } from '../../use-case/services/app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
