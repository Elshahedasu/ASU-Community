import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postID: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  authorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Comment", CommentSchema);
