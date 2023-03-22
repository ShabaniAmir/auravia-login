import * as bcrypt from "bcrypt";
import { prisma } from "~/server/db";
import { User as PrismaUser } from "@prisma/client";

export const User = Object.assign(prisma.user, {
    signUp: async (email: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log({ hashedPassword })
        return await prisma.user.create({
            data: {
                email: email,
                Credentials: {
                    create: {
                        type: "password",
                        content: hashedPassword,
                    },
                }
            },
        })
    }
});