import express from "express";
import cors from "cors";

import Database from "./Config/db.js";

import userRouter from "./Routes/userRoutes.js";
import courseRouter from "./Routes/courseRoutes.js";
import threadRoutes from "./Routes/threadRoutes.js";
import questionRoutes from "./Routes/questionRoutes.js";
import replyRoutes from "./Routes/replyRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import voteRoutes from "./Routes/voteRoutes.js";
import enrollmentRoutes from "./Routes/enrollmentRoutes.js";
import threadSubscriptionRoutes from "./Routes/threadSubscriptionRoutes.js";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5174"],
        credentials: true,
    })
);

// ✅ BODY PARSER MUST BE FIRST
app.use(express.json({ limit: "10mb" }));

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/threads", threadRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/thread-subscriptions", threadSubscriptionRoutes);

// START SERVER
try {
    await Database();
    console.log("✅ MongoDB connected successfully");

    app.listen(5200, () =>
        console.log("✅ APP Runs Successfully on Port 5200")
    );
} catch (e) {
    console.error("❌ Failed to connect to MongoDB:", e.message);
    process.exit(1);
}