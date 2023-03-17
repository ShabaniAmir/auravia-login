import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service';

export type UsersSafeObject = Omit<User, 'password'>;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    toSafeObject(user: User) {
        const { password, ...rest } = user;
        return rest;
    }

    manyToSafeObject(users: User[]) {
        return users.map(this.toSafeObject);
    }

    async user(UserWhereUniqueInput: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: UserWhereUniqueInput,
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput) {

        const hashedPassword = await bcrypt.hash(data.password, 10);
        return await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });

    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }) {
        const { where, data } = params;
        return await this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.delete({
            where,
        });
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async validateUser(email: string, password: string) {
        const user = await this.findUserByEmail(email);
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                return user;
            }
        }
        return null;
    }

    async generateJWT(user: User) {
        return JWT.sign(
            {
                id: user.id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            },
        );
    }

    async verify(token: string) {
        const { id } = JWT.verify(token, process.env.JWT_SECRET) as { id: string };
        return this.prisma.user.findUnique({
            where: {
                id,
            },
        });
    }
}
