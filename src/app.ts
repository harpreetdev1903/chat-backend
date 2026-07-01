import express from "express";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Chat Backend is Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

export default app;