import Report from "../Models/Report.js";
import ActivityLog from "../Models/ActivityLog.js";

/* ======================================================
   CREATE REPORT
====================================================== */
export const createReport = async (req, res) => {
  try {
    const { reporterId, targetId, targetType, reason } = req.body;

    if (!reporterId || !targetId || !targetType || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const report = await Report.create({
      _id: `RP-${Date.now()}`,
      reporterId,
      targetId,
      targetType,
      reason,
      status: "pending",
    });

    await ActivityLog.create({
      _id: `AL-${Date.now()}`,
      userID: reporterId,
      actionType: "CREATE_REPORT",
      targetID: report._id,
      detail: "User reported content",
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ======================================================
   GET REPORTED REPLIES (INSTRUCTOR)
====================================================== */
export const getReportedReplies = async (req, res) => {
  try {
    const reports = await Report.find({
      targetType: "reply",
      status: "pending",
    });

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
