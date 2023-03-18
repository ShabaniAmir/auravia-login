import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService) { }

    async createAccount(tenantId: string, data: Prisma.AccountCreateInput) {
        return this.prisma.account.create({
            data: {
                ...data,
                Tenant: {
                    connect: {
                        id: tenantId
                    }
                }
            }
        })
    }

    async getAccounts(tenantId: string) {
        return this.prisma.account.findMany({
            where: {
                tenantId
            }
        })
    }

    async getAccount(tenantId: string, accountId: string) {
        return this.prisma.account.findUnique({
            where: {
                id: accountId
            }
        })
    }
}
