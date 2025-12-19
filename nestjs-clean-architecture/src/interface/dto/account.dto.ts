export class CreateAccountDto {
    ownerName!: string;
    document!: string;
}

export class UpdateAccountDto {
    balance?: number;
}