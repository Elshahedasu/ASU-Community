import Reply from "../Models/Reply.js";
import ActivityLog from "../Models/ActivityLog.js";

/* ======================================================
   CREATE REPLY (STUDENT)
====================================================== */
export const createReply = async(req, res) => {
    try {
        const { _id, questionId, authorId, content } = req.body;

        if (!_id || !questionId || !authorId || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const reply = await Reply.create({
            _id,
            questionId,
            authorId,
            content,
            upvotes: 0,
            isBest: false,
            status: "active",
        });

        await ActivityLog.create({
            _id: `AL-${Date.now()}`,
            userId: authorId,
            actionType: "posted_reply",
            targetId: _id,
            detail: "Student replied to a question",
        });

        res.status(201).json(reply);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ======================================================
   GET REPLIES BY QUESTION
====================================================== */
export const getRepliesByQuestion = async(req, res) => {
    try {
        const { questionId } = req.params;

        const replies = await Reply.find({
            questionId,
            status: "active",
        }).sort({ isBest: -1, createdAt: 1 });

        res.status(200).json(replies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};