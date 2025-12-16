import express from "express";
import {
    createReport,
    getReportedReplies,
} from "../Controllers/report.js";

import Report from "../Models/Report.js";

const router = express.Router();

/* =========================
   ADMIN (ADDED — NO CHANGES)
========================= */

// ✅ GET ALL REPORTS (Admin dashboard)
router.get("/", async(req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* =========================
   EXISTING ROUTES
========================= */

router.post("/", createReport);

// Used by instructor moderation
router.get("/replies", getReportedReplies);

export default router;