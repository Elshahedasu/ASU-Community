import express from "express";
import { postAnnouncement } from "../Controllers/announcementController.js";

const router = express.Router();

/**
 * POST announcement
 * POST /api/announcements
 */
router.post("/", postAnnouncement);

export default router;
