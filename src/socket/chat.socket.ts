import { Server, Socket } from "socket.io";
import { prisma } from "../lib/prisma";

const onlineUsers = new Map<string, string>();

export const registerChatHandlers = (io: Server, socket: Socket) => {
    const userId = socket.handshake.auth.userId as string;

    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} is online`);

    socket.on("sendMessage", async (data: { receiverId: string; content: string }) => {
        const message = await prisma.message.create({
            data: {
                senderId: userId,
                receiverId: data.receiverId,
                content: data.content,
            },
        });

        const receiverSocketId = onlineUsers.get(data.receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", message);
        }

        socket.emit("messageSent", message);
    });

    socket.on("disconnect", () => {
        onlineUsers.delete(userId);
        console.log(`User ${userId} went offline`);
    });
};