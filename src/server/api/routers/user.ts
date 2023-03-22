import { TRPCError } from '@trpc/server';
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

import { User } from "~/models/User";
export const userRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(4),
            })
        )
        .mutation(async ({ input }) => {
            try {
                const user = await User.signUp(input.email, input.password);
                return user;
            }
            catch (e: any) {
                if (e.code && e.code === 'P2002') {
                    throw new TRPCError({
                        code: 'FORBIDDEN',
                        message: 'Email already exists',
                    });
                }
            }
        }
        ),
});