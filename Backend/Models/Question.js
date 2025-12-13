import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  threadID: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  bestAnswerID: { type: mongoose.Schema.Types.ObjectId, ref: "Reply" },
  status: { type: String, default: "open" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Question", QuestionSchema);
