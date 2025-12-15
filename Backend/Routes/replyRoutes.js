import express from "express";
import {
  getRepliesByQuestion,
  createReply
} from "../Controllers/ReplyController.js"; // ✅ FIXED CASE

const router = express.Router();

/**
 * Get replies by question
 * GET /api/replies/question/:questionId
 */
router.get("/question/:questionId", getRepliesByQuestion);

/**
 * Create reply (student / instructor)
 * POST /api/replies
 */
router.post("/", createReply);

export default router;
