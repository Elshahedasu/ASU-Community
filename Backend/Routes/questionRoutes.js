import express from "express";
import { getQuestionsByCourse } from "../Controllers/questionController.js";


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
router.get("/course/:courseId", getQuestionsByCourse);

/**
 * Create question (student)
 * POST /api/questions
 */
router.post("/", createQuestion);

export default router;