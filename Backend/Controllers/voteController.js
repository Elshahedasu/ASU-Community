import Vote from "../Models/Vote.js";
import Reply from "../Models/Reply.js";
import ActivityLog from "../Models/ActivityLog.js";

export const voteReply = async (req, res) => {
  try {
    const { userId, replyId, voteType } = req.body;

    // ✅ Validate input
    if (!userId || !replyId || !voteType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Prevent duplicate voting
    const existingVote = await Vote.findOne({
      userId,
      targetId: replyId,
    });

    if (existingVote) {
      return res.status(409).json({ message: "Already voted" });
    }

    // ✅ Create vote (MATCHES SCHEMA)
    await Vote.create({
      _id: `V-${Date.now()}`,       // REQUIRED
      userId,
      targetId: replyId,
      targetType: "reply",
      voteType,                     // "upvote" | "downvote"
    });

    // ✅ INCREMENT UPVOTES (FIXED CONDITION)
    if (voteType === "upvote") {
      await Reply.findByIdAndUpdate(replyId, {
        $inc: { upvotes: 1 },
      });
    }

    // ✅ Activity log (MATCHES YOUR MODEL)
    await ActivityLog.create({
      _id: `AL-${Date.now()}`,
      userID: userId,
      actionType: "UPVOTE_REPLY",
      targetID: replyId,
      detail: "User upvoted a reply",
    });

    res.status(200).json({ message: "Vote recorded" });
  } catch (err) {
    console.error("VOTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
