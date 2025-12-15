import express from "express";
import {
    getRepliesByQuestion,
    createReply
} from "../Controllers/ReplyController.js";

const router = express.Router();

/**
 * Get replies by question
 * GET /api/replies/question/:questionId
 */
router.get("/question/:questionId", getRepliesByQuestion);

/**
 * Create reply (student)
 * POST /api/replies
 */
router.post("/", createReply);

export default router;