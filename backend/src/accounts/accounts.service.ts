import { Tenant } from './../../node_modules/.prisma/client/index.d';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
@Injectable()
export class AccountsService {
    constructor(private prisma: PrismaService) { }

    async createAccount(tenantId: string, data: { credential: string, password: string }) {
        data.password = await bcrypt.hash(data.password, 10);
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
                id_tenantId: {
                    id: accountId,
                    tenantId
                }
            }
        }).then(account => {
            const { password, ...accountWithoutPassword } = account;
            return accountWithoutPassword;
        }
        )
    }

    async generateToken(tenant: Tenant, credential: string, password: string) {
        // Get jwt secret from tenant
        const { jwt_secret } = tenant;
        // Get account
        const account = await this.prisma.account.findUnique({
            where: {
                tenantId_credential: {
                    tenantId: tenant.id,
                    credential
                }
            }
        })
        // Check if account exists
        if (!account) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, account.password);
        if (!isPasswordCorrect) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        // Generate token
        const token = Jwt.sign({
            id: account.id,
            tenantId: tenant.id
        }, jwt_secret, {
            expiresIn: '1d'
        })

        return { token };

    }

    async verifyToken(tenant: Tenant, token: string) {
        // Get jwt secret from tenant
        const { jwt_secret } = tenant;
        // Verify token
        try {
            const decodedToken = Jwt.verify(token, jwt_secret) as { id: string, tenantId: string };
            if (!decodedToken || !decodedToken.id || !decodedToken.tenantId) {
                throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
            }
            const account = await this.getAccount(tenant.id, decodedToken.id);
            return account;
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}
