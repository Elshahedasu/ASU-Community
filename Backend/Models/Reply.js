import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  questionID: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  upvotes: { type: Number, default: 0 },
  isBest: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reply", ReplySchema);
