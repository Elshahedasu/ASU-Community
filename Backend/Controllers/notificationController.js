import Notification from "../Models/Notification.js";
import ActivityLog from "../Models/ActivityLog.js";

/* ======================================================
   GET MY NOTIFICATIONS
   GET /api/notifications?userId=U1001
====================================================== */
export const getMyNotifications = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   MARK NOTIFICATION AS READ
   PATCH /api/notifications/:notificationId/read
====================================================== */
export const markAsRead = async (req, res) => {
  try {
    const { userId } = req.body;

    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    notification.read = true;
    await notification.save();

    await ActivityLog.create({
      _id: `AL-${Date.now()}`,
      userID: userId,
      actionType: "READ_NOTIFICATION",
      targetID: notification._id,
      detail: "Notification marked as read",
    });

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   DELETE NOTIFICATION  ✅ THIS WAS MISSING
   DELETE /api/notifications/:notificationId
====================================================== */
export const deleteNotification = async (req, res) => {
  try {
    const { userId } = req.body;

    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await notification.deleteOne();

    await ActivityLog.create({
      _id: `AL-${Date.now()}`,
      userID: userId,
      actionType: "DELETE_NOTIFICATION",
      targetID: req.params.notificationId,
      detail: "Notification deleted",
    });

    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ======================================================
   GET UNREAD COUNT
   GET /api/notifications/unread-count?userId=U1001
====================================================== */
export const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const count = await Notification.countDocuments({
      userId,
      read: false,
    });

    res.status(200).json({ unread: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
