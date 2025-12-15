import Reply from "../Models/Reply.js";
import Question from "../Models/Question.js";
import ActivityLog from "../Models/ActivityLog.js";

/* ======================================================
   CREATE REPLY (STUDENT / INSTRUCTOR)
====================================================== */
export const createReply = async (req, res) => {
  try {
    const { _id, questionId, authorId, content } = req.body;

    if (!_id || !questionId || !authorId || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // get question to extract threadId (REQUIRED by schema)
    const question = await Question.findOne({ _id: questionId });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const reply = await Reply.create({
      _id,
      questionId,
      threadId: question.threadId, // ✅ REQUIRED
      authorId,
      content,
      upvotes: 0,
      isBest: false,
      status: "active",
    });

    // activity log (DO NOT CHANGE MODEL)
    await ActivityLog.create({
      _id: `AL-${Date.now()}`,
      userID: authorId,
      actionType: "posted_reply",
      targetID: questionId,
      detail: "Replied to a question",
    });

    res.status(201).json(reply);
  } catch (err) {
    console.error("CREATE REPLY ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ======================================================
   GET REPLIES BY QUESTION
====================================================== */
export const getRepliesByQuestion = async (req, res) => {
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
