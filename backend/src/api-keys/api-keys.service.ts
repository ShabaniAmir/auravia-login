import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApiKeysService {
    constructor(private readonly prisma: PrismaService) { }

    async createApiKey(data: Prisma.ApiKeyCreateInput) {
        return this.prisma.apiKey.create({ data });
    }

    async getApiKey(id: string) {
        return this.prisma.apiKey.findUnique({ where: { id } });
    }

    async getApiKeys(filters: Prisma.ApiKeyWhereInput) {
        return this.prisma.apiKey.findMany({ where: filters });
    }

    async updateApiKey(id: string, data: Prisma.ApiKeyUpdateInput) {
        return this.prisma.apiKey.update({ where: { id }, data });
    }

    async deleteApiKey(id: string) {
        const deletedApiKey = await this.prisma.apiKey.delete({ where: { id } });
        return {
            message: `ApiKey deleted successfully`,
        }
    }

}
