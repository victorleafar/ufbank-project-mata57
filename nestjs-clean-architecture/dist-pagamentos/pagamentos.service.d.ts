import { ProcessarPagamentoDto, Pagamento } from './dto';
export declare class PagamentosService {
    private readonly logger;
    private pagamentos;
    processar(dto: ProcessarPagamentoDto): Promise<Pagamento>;
    buscarPorId(id: string): Promise<Pagamento | null>;
    listar(): Promise<Pagamento[]>;
}
