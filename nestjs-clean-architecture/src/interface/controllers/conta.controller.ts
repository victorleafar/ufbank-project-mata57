import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateContaDto, ContaResponseDto } from '@src/interface/dto/conta.dto';
import { PagamentoAprovadoEvent } from '@src/interface/dto/pagamento.dto';
import { ContaService } from '@src/use-case/services/conta.service';

@Controller('contas')
export class ContaController {
    private readonly logger = new Logger('ContaController');

    constructor(private readonly contaService: ContaService) {}

    @Post()
    async criar(@Body() dto: CreateContaDto): Promise<ContaResponseDto> {
        const conta = await this.contaService.criar(
            dto.titularId,
            dto.titular,
            dto.saldoInicial || 0
        );
        return ContaResponseDto.fromEntity(conta);
    }

    @Get()
    async listar(): Promise<ContaResponseDto[]> {
        const contas = await this.contaService.findAll();
        return ContaResponseDto.fromEntities(contas);
    }

    @Get(':id')
    async buscar(@Param('id') id: string): Promise<ContaResponseDto> {
        const conta = await this.contaService.findById(id);
        return ContaResponseDto.fromEntity(conta);
    }

    @EventPattern('PAGAMENTO_APROVADO')
    async handlePagamentoAprovado(@Payload() evento: PagamentoAprovadoEvent): Promise<void> {

        this.logger.log(`Pagamento ID: ${evento.pagamentoId}`);
        this.logger.log(`Conta Origem: ${evento.contaOrigemId}`);
        this.logger.log(`Valor: R$ ${evento.valor.toFixed(2)}`);

        if (evento.contaDestinoId) {
            this.logger.log(`Conta Destino: ${evento.contaDestinoId}`);
        }
        this.logger.log(`═══════════════════════════════════════════════════════`);

        await this.contaService.processarPagamentoAprovado(evento);
        
        this.logger.log(`Saldo atualizado com sucesso via Event-Driven Architecture!`);
    }
}
