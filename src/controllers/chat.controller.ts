import { NextFunction, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getChatHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user!.id;
        const receiverId = req.params.receiverId as string;

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId },
                    { senderId: receiverId, receiverId: userId },
                ],
            },
            orderBy: { createdAt: "asc" },
        });

        res.status(200).json({ messages });
    } catch (err) {
        next(err);
    }
};