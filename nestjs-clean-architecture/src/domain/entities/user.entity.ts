export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly cpf: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly createdAt: Date
    ) {
        if (!name || name.trim().length < 3) {
            throw new Error('Nome deve ter no mínimo 3 caracteres');
        }
    }
}