import express from "express";
import { subscribeToThread } from "../Controllers/threadSubscriptionController.js";

const router = express.Router();

/**
 * Subscribe to thread
 * POST /api/thread-subscriptions
 */
router.post("/", subscribeToThread);

export default router;