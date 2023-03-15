import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Tenant } from "~/models/";
import { User } from "~/models/";
import { User as PrismaUser } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];
    let user: { id: string, email: string };
    if (!token) {
        return res.status(401).json({
            error: "Missing token",
        });
    }

    try {
        user = await User.verifyToken(token);
        if (!user) {
            return res.status(401).json({
                error: "Invalid token",
            });
        }
    } catch (error: any) {
        return res.status(401).json({
            error: error.message,
        });
    }

    if (req.method === "GET") {
        try {
            const tenants = await Tenant.findMany({
                where: {
                    ownerId: user.id,
                }
            });
            return res.status(200).json({
                tenants,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    } else if (req.method === "POST") {
        try {
            const tenant = await Tenant.create({
                data: {
                    Owner: {
                        connect: {
                            id: user.id,
                        }
                    },
                },
            });
            return res.status(200).json({
                tenant,
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    } else {
        res.status(405).end();
    }
}