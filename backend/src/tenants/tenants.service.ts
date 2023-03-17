import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class TenantsService {
    constructor(private prisma: PrismaService) { }

    async createTenant(data: Prisma.TenantCreateInput) {
        return this.prisma.tenant.create({ data });
    }

    async getTenant(id: string) {
        return this.prisma.tenant.findUnique({ where: { id } });
    }

    async getTenants(filters: Prisma.TenantWhereInput) {
        return this.prisma.tenant.findMany({ where: filters });
    }

    async updateTenant(id: string, data: Prisma.TenantUpdateInput) {
        return this.prisma.tenant.update({ where: { id }, data });
    }

    async deleteTenant(id: string) {
        const deletedTenant = await this.prisma.tenant.delete({ where: { id } });
        return {
            message: `Tenant deleted successfully`,
        }
    }

}
