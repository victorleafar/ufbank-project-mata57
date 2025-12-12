import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World from Clean Architecture!';
    }
    getHealth(isHealth: number[]): string {
        if((isHealth.length) >= 3){
            isHealth.forEach(index => {
                console.log('Health check ' + index);
            });
        }
        return 'API Saudável';
    }   
}
