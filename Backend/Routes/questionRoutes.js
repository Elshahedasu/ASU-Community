import express from "express";
import {
    getQuestionsByThread,
    createQuestion
} from "../Controllers/questionController.js";

const router = express.Router();

/**
 * Get questions by thread
 * GET /api/questions/thread/:threadId
 */
router.get("/thread/:threadId", getQuestionsByThread);

/**
 * Create question (student)
 * POST /api/questions
 */
router.post("/", createQuestion);

export default router;