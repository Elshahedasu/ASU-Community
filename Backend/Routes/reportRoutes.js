import express from "express";
import {
  createReport,
  getReportedReplies,
} from "../Controllers/report.js"; // 👈 MUST be this

const router = express.Router();

router.post("/", createReport);
router.get("/replies", getReportedReplies);

export default router;
