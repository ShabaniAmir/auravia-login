import { IsNotEmpty } from 'class-validator';

export class ApiKeyDto {
    @IsNotEmpty()
    tenantId: string;
}