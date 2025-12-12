
export class Conta {
    constructor(
        public readonly id: string,
        public readonly titularId: string,
        public readonly titular: string,
        public saldo: number,
        public readonly criadaEm: Date,
        public atualizadaEm: Date
    ) {
        if (saldo < 0) {
            throw new Error('Saldo inicial não pode ser negativo');
        }
    }

    debitar(valor: number): void {
        if (valor <= 0) {
            throw new Error('Valor deve ser maior que zero');
        }
        if (this.saldo < valor) {
            throw new Error('Saldo insuficiente');
        }
        this.saldo -= valor;
        this.atualizadaEm = new Date();
    }

    creditar(valor: number): void {
        if (valor <= 0) {
            throw new Error('Valor deve ser maior que zero');
        }
        this.saldo += valor;
        this.atualizadaEm = new Date();
    }
}
