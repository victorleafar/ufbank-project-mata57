import { User } from '../../domain/entities/user.entity';

export class CreateUserDto {
    name!: string;
    cpf!: string;
    email!: string;
    phone!: string;
}


export class UserResponseDto {
    id!: string;
    name!: string;
    cpf!: string;
    email!: string;
    phone!: string;
    createdAt!: string;

    static fromEntity(user: User): UserResponseDto {
        return {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt.toISOString()
        };
    }

    static fromEntities(users: User[]): UserResponseDto[] {
        return users.map(u => this.fromEntity(u));
    }
}