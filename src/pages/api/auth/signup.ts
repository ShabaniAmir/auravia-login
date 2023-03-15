import { User } from "~/models/";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Missing email or password",
            });
        }
        try {
            const user = await User.signUp({
                email,
                password,
            });
            const token = await User.generateToken({
                email,
                password,
            });
            return res.status(200).json({
                user: User.toSafeObject(user),
                token,
            });
        } catch (error: any) {
            const message = error.message as string;
            if (message.includes("Unique")) {
                return res.status(400).json({
                    error: "Email already in use",
                });
            }
            res.status(400).json({
                error: error.message,
            });
        }
    } else {
        res.status(405).end();
    }
}