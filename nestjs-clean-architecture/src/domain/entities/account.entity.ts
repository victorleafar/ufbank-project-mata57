import { User } from './user.entity';

export class Account {
    constructor(
        public readonly id: string,
        public readonly user: User,
        public balance: number = 0,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt?: Date
    ) {}

    getOwnerName(): string {
        return this.user.name;
    }

    getDocument(): string {
        return this.user.cpf;
    }
}