import express from "express";
import {
  createThread,
  getThreadsByCourse,
  getThreadById,
  togglePinThread,
  updateThread,
  deleteThread
} from "../Controllers/threadController.js";


const router = express.Router();

/* ======================================================
   Thread Routes
====================================================== */

/**
 * Create thread (Instructor / Admin)
 * POST /api/threads
 */
router.post("/",createThread);

/**
 * Get all threads for a course
 * GET /api/threads/course/:courseID
 */
router.get("/course/:courseID",  getThreadsByCourse);

/**
 * Get single thread
 * GET /api/threads/:threadID
 */
router.get("/:threadID",  getThreadById);

/**
 * Pin / Unpin thread (Instructor / Admin)
 * PATCH /api/threads/:threadID/pin
 */
router.patch("/:threadID/pin",togglePinThread);

/**
 * Update thread (Creator / Admin)
 * PUT /api/threads/:threadID
 */
router.put("/:threadID", updateThread);

/**
 * Delete thread (soft delete)
 * DELETE /api/threads/:threadID
 */
router.delete("/:threadID", deleteThread);

export default router;
