import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '~/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Missing email or password",
            });
        }
        try {
            const token = await User.generateToken({
                email,
                password,
            });
            return res.status(200).json({
                token,
            });
        } catch (error: any) {
            const message = error.message as string;
            return res.status(400).json({
                error: message,
            });
        }
    }
}