import express from "express";
import {
  getMyNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount
} from "../Controllers/notificationController.js";

const router = express.Router();

router.get("/", getMyNotifications);
router.get("/unread-count", getUnreadCount);
router.patch("/:notificationId/read", markAsRead);
router.delete("/:notificationId", deleteNotification);

export default router;
