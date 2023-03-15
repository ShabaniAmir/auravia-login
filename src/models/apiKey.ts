import { ApiKey } from "@prisma/client";
import { prisma } from "~/server/db";

export const APIKeyModel = prisma.apiKey; //Object.assign(prisma.apiKey, {});
export type { ApiKey as APIKeyType };