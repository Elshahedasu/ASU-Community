import Vote from "../Models/Vote.js";
import Reply from "../Models/Reply.js";
import ActivityLog from "../Models/ActivityLog.js";
import Notification from "../Models/Notification.js";

export const voteReply = async (req, res) => {
  try {
    const { userId, replyId, voteType } = req.body;

    if (!userId || !replyId || !voteType) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existing = await Vote.findOne({
      userId,
      targetId: replyId,
    });

    if (existing) {
      return res.status(409).json({ message: "Already voted" });
    }

    await Vote.create({
      _id: `V-${Date.now()}`,
      userId,
      targetId: replyId,
      targetType: "reply",
      voteType,
    });

    if (voteType === "upvote") {
      await Reply.findByIdAndUpdate(replyId, {
        $inc: { upvotes: 1 },
      });
    }

    const reply = await Reply.findById(replyId);

    // 🔔 NOTIFY REPLY AUTHOR
    if (reply && reply.authorId !== userId) {
      await Notification.create({
        _id: `N-${Date.now()}`,
        userId: reply.authorId,
        type: "vote",
        payload: "Your reply received an upvote",
        read: false,
      });
    }

    await ActivityLog.create({
      _id: `AL-${Date.now()}`,
      userID: userId,
      actionType: "UPVOTE_REPLY",
      targetID: replyId,
      detail: "User upvoted reply",
    });

    res.json({ message: "Vote recorded" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
