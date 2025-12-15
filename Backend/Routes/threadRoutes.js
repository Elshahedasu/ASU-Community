import express from "express";
import {
    createThread,
    getThreadsByCourse,
    getThreadById,
    togglePinThread,
    deleteThread
} from "../Controllers/threadController.js";

const router = express.Router();

/* ======================================================
   Thread Routes
====================================================== */

/**
 * Create thread
 * POST /api/threads
 */
router.post("/", createThread);

/**
 * Get all threads for a course  ✅ (USED BY Threads.jsx)
 * GET /api/threads/course/:courseId
 */
router.get("/course/:courseId", getThreadsByCourse);

/**
 * Get single thread
 * GET /api/threads/:threadId
 */
router.get("/:threadId", getThreadById);

/**
 * Pin / Unpin thread
 * PATCH /api/threads/:threadId/pin
 */
router.patch("/:threadId/pin", togglePinThread);

/**
 * Delete thread (soft delete)
 * DELETE /api/threads/:threadId
 */
router.delete("/:threadId", deleteThread);

export default router;