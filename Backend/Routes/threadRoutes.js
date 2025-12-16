import express from "express";
import {
    createThread,
    getThreadsByCourse,
    getThreadById,
    togglePinThread,
    deleteThread
} from "../Controllers/threadController.js";

import Thread from "../Models/Thread.js";

const router = express.Router();

/* ======================================================
   ADMIN (ADDED — NO CHANGES)
====================================================== */

// ✅ GET ALL THREADS (Admin dashboard)
router.get("/", async(req, res) => {
    try {
        const threads = await Thread.find();
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ======================================================
   Thread Routes
====================================================== */

/**
 * Create thread
 * POST /api/threads
 */
router.post("/", createThread);

/**
 * Get all threads for a course
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