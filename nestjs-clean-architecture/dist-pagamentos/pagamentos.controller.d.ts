import { ClientProxy } from '@nestjs/microservices';
import { PagamentosService } from './pagamentos.service';
import { ProcessarPagamentoDto } from './dto';
export declare class PagamentosController {
    private readonly pagamentosService;
    private readonly ufbankClient;
    private readonly logger;
    constructor(pagamentosService: PagamentosService, ufbankClient: ClientProxy);
    processarPagamento(dto: ProcessarPagamentoDto): Promise<import("./dto").Pagamento>;
    consultarPagamento(payload: {
        id: string;
    }): Promise<import("./dto").Pagamento>;
    listarPagamentos(): Promise<import("./dto").Pagamento[]>;
}
