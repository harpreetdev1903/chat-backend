import { NextFunction, Response } from "express";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const currentUserId = req.user!.id;

        const users = await prisma.user.findMany({
            where: { id: { not: currentUserId } },
            select: { id: true, username: true },
        });

        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};