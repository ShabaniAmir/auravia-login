import { getTokenFromRequest, ProtectedNextApiRoute } from '~/lib/Authentication';
import { NextApiRequest, NextApiResponse } from "next";
import { User, Tenant, UserType } from "~/models/";
const handler = async (
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    const token = getTokenFromRequest(req) as string;
    const user = await User.verifyToken(token);
    const { id } = req.query;
    if (typeof id !== "string") {
        return res.status(400).json({
            error: "Invalid id",
        });
    }

    if (req.method === "DELETE") {
        console.log({ id })
        if (!id) {
            return res.status(400).json({
                error: "Missing id",
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

        try {
            await Tenant.delete({
                where: {
                    id: id,
                },
            });
            return res.status(200).json({
                message: "Tenant deleted",
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
}

export default ProtectedNextApiRoute(handler);