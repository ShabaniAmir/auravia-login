import { NextApiRequest, NextApiResponse } from "next";
import { User, Tenant, APIKey } from "~/models/";
import type { TenantType, UserType } from "~/models/";
import { ProtectedNextApiRoute, getTokenFromRequest, getUserFromToken } from "~/lib/Authentication";

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

    const { apiKey } = req.query;
    if (typeof apiKey !== "string") {
        return res.status(400).json({
            error: "Invalid apiKey",
        });
    }

    if (req.method === "DELETE") {
        try {
            await APIKey.delete({
                where: {
                    key: apiKey,
                },
            });
            return res.status(200).json({
                message: "Key deleted",
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
});