import { Conta } from '../../domain/entities/conta.entity';

export class CreateContaDto {
    titularId!: string;
    titular!: string;
    saldoInicial?: number;
}

export class ContaResponseDto {
    id!: string;
    titularId!: string;
    titular!: string;
    saldo!: number;
    criadaEm!: string;
    atualizadaEm!: string;

    static fromEntity(conta: Conta): ContaResponseDto {
        return {
            id: conta.id,
            titularId: conta.titularId,
            titular: conta.titular,
            saldo: conta.saldo,
            criadaEm: conta.criadaEm.toISOString(),
            atualizadaEm: conta.atualizadaEm.toISOString()
        };
    }

    static fromEntities(contas: Conta[]): ContaResponseDto[] {
        return contas.map(c => this.fromEntity(c));
    }
}
