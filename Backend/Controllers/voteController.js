import Vote from "../Models/Vote.js";
import Reply from "../Models/Reply.js";
import ActivityLog from "../Models/ActivityLog.js";

export const voteReply = async(req, res) => {
    try {
        const { userId, replyId, voteType } = req.body;

        // prevent double voting
        const existing = await Vote.findOne({
            userId,
            targetId: replyId,
        });

        if (existing) {
            return res.status(409).json({ message: "Already voted" });
        }

        await Vote.create({
            userId,
            targetId: replyId,
            targetType: "reply",
            voteType,
        });

        if (voteType === "up") {
            await Reply.findByIdAndUpdate(replyId, {
                $inc: { upvotes: 1 },
            });
        }

        await ActivityLog.create({
            _id: `AL-${Date.now()}`,
            userId,
            actionType: "voted_reply",
            targetId: replyId,
            detail: "Student voted on reply",
        });

        res.json({ message: "Vote recorded" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};