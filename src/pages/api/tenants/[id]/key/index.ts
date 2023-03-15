import { ProtectedNextApiRoute, getTokenFromRequest, getUserFromToken } from "~/lib/Authentication";
import { NextApiRequest, NextApiResponse } from "next";
import { User, Tenant, APIKey } from "~/models/";
import type { TenantType, UserType } from "~/models/";

export default ProtectedNextApiRoute(async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    const token = getTokenFromRequest(req) as string;
    const user = await getUserFromToken(token) as UserType;
    const { id } = req.query;
    if (typeof id !== "string") {
        return res.status(400).json({
            error: "Invalid id",
        });
    }

    const tenant = await Tenant.findUnique({
        where: {
            id: id,
        },
    });

    if (!tenant) {
        return res.status(400).json({
            error: "Tenant not found",
        });
    }

    if (tenant.ownerId !== user.id) {
        return res.status(401).json({
            error: "Unauthorized",
        });
    }

    if (req.method === "GET") {
        try {
            const keys = await APIKey.findMany({
                where: {
                    tenantId: id,
                },
            });
            return res.status(200).json({
                keys,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    } else if (req.method === "POST") {
        try {
            const key = await APIKey.create({
                data: {
                    Tenant: {
                        connect: {
                            id: tenant.id,
                        },
                    },
                },
            });
            return res.status(200).json({
                key,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
})
