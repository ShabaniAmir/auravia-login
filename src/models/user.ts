import { prisma } from "~/server/db";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { env } from "~/env.mjs";
import { User } from "@prisma/client";

export const UserModel = Object.assign(prisma.user, {
    // Add custom methods here
    // Create a new user
    signUp: async ({ email, password }: {
        email: string,
        password: string,
    }) => {
        if (!email || !password) {
            console.log({ email, password })
            throw new Error("Missing email or password");
        }
        console.log("Making user with: ", { email, password });

        const hashedPassword = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });
    },
    toSafeObject: (user: User) => {
        return {
            id: user.id,
            email: user.email,
        };
    },
    generateToken: async ({ email, password }: {
        email: string,
        password: string,
    }) => {
        if (!email || !password) {
            throw new Error("Missing email or password");
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error("Invalid email or password");
        }
        return JWT.sign({
            id: user.id,
            email: user.email,
        }, env.JWT_SECRET, {
            expiresIn: "1d",
        });
    },
    verifyToken: async (token: string) => {
        if (!token) {
            throw new Error("Missing token");
        }
        const decoded = JWT.verify(token, env.JWT_SECRET);
        if (!decoded) {
            throw new Error("Invalid token");
        }
        return decoded;
    }

});
