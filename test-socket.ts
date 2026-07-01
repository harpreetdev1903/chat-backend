import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    auth: { userId: "747e3e92-aee7-45d8-9735-85e2d71819bd" }
});

socket.on("connect", () => {
    console.log("Connected:", socket.id);

    socket.emit("sendMessage", {
        receiverId: "c3d0ec2e-7dca-491a-b638-e3291e911991",
        content: "Hello from harpreet!"
    });
});

socket.on("messageSent", (message) => {
    console.log("Message saved:", message);
    socket.disconnect();
});

socket.on("connect_error", (err) => {
    console.log("Connection error:", err.message);
});