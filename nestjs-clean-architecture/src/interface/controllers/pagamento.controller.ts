
import { Controller, Post, Get, Body, Param, Inject, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { ProcessarPagamentoDto, PagamentoResponseDto } from '@src/interface/dto/pagamento.dto';

@Controller('pagamentos')
export class PagamentoController {
    private readonly logger = new Logger('PagamentoController');

    constructor(
        @Inject('PAGAMENTOS_SERVICE')
        private readonly pagamentosClient: ClientProxy,
    ) {}

    @Post()
    async processar(@Body() dto: ProcessarPagamentoDto): Promise<PagamentoResponseDto> {
        this.logger.log(`════════════════════════════════════════════════════════`);
        this.logger.log(`   Conta Origem: ${dto.contaOrigemId}`);
        this.logger.log(`   Valor: R$ ${dto.valor.toFixed(2)}`);
        this.logger.log(`   Tipo: ${dto.tipo}`);
        this.logger.log(`   Descrição: ${dto.descricao}`);
        this.logger.log(`────────────────────────────────────────────────────────`);
        this.logger.log(`Enviando para Pagamentos Service via TCP (porta 3001)...`);

        try {

            const resultado = await firstValueFrom(
                this.pagamentosClient
                    .send<PagamentoResponseDto>('PROCESSAR_PAGAMENTO', dto)
                    .pipe(
                        timeout(10000),
                        catchError((err) => {
                            this.logger.error(`Erro na comunicação TCP: ${err.message}`);
                            throw new HttpException(
                                'Microserviço de Pagamentos indisponível',
                                HttpStatus.SERVICE_UNAVAILABLE,
                            );
                        }),
                    ),
            );

            this.logger.log(`────────────────────────────────────────────────────────`);
            this.logger.log(`Resposta recebida do Pagamentos Service`);
            this.logger.log(`Status: ${resultado.status}`);
            this.logger.log(`ID: ${resultado.id}`);
            this.logger.log(`════════════════════════════════════════════════════════`);

            return resultado;
        } catch (error: any) {
            this.logger.error(`Falha ao processar pagamento: ${error.message}`);
            throw error;
        }
    }

    @Get()
    async listar(): Promise<PagamentoResponseDto[]> {

        try {
            const resultado = await firstValueFrom(
                this.pagamentosClient
                    .send<PagamentoResponseDto[]>('LISTAR_PAGAMENTOS', {})
                    .pipe(
                        timeout(5000),
                        catchError((err) => {
                            throw new HttpException(
                                'Microserviço de Pagamentos indisponível',
                                HttpStatus.SERVICE_UNAVAILABLE,
                            );
                        }),
                    ),
            );

            return resultado;
        } catch (error) {
            throw error;
        }
    }

    @Get(':id')
    async buscar(@Param('id') id: string): Promise<PagamentoResponseDto> {

        try {
            const resultado = await firstValueFrom(
                this.pagamentosClient
                    .send<PagamentoResponseDto>('CONSULTAR_PAGAMENTO', { id })
                    .pipe(
                        timeout(5000),
                        catchError((err) => {
                            throw new HttpException(
                                'Microserviço de Pagamentos indisponível',
                                HttpStatus.SERVICE_UNAVAILABLE,
                            );
                        }),
                    ),
            );

            if (!resultado) {
                throw new HttpException('Pagamento não encontrado', HttpStatus.NOT_FOUND);
            }

            return resultado;
        } catch (error) {
            throw error;
        }
    }
}
