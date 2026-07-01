import express, { NextFunction, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Chat Backend is Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", {
        message: err.message,
        code: err.code,
        meta: err.meta,
        stack: err.stack,
    });
    res.status(500).json({
        message: "Internal server error",
        code: err.code ?? null,
        meta: err.meta ?? null,
    });
});

export default app;