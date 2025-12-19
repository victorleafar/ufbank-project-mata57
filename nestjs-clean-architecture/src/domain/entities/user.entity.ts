export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly cpf: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly createdAt: Date
    ) {
        
    }
}