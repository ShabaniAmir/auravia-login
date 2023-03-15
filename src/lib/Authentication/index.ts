import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { User, UserType } from "~/models";

export function getTokenFromRequest(req: NextApiRequest): string | null {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
    const user = User.verifyToken(token);
    if (!user) return null;
    return token;
}

export async function getUserFromToken(token: string): Promise<UserType | null> {
    try {
        const user = await User.verifyToken(token);
        if (!user) return null;
        return await User.findUnique({
            where: {
                id: user.id,
            },
        });
    } catch (error: any) {
        return null;
    }
}

export function ProtectedNextApiRoute(
    handler: NextApiHandler,
) {
    return (req: NextApiRequest, res: NextApiResponse) => {
        const token = getTokenFromRequest(req);
        if (!token) {
            return res.status(401).json({
                error: "Missing token",
            });
        }
        return handler(req, res);
    }
}
