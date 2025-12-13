import mongoose from "mongoose";

const ThreadSchema = new mongoose.Schema({
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: String,
  creatorID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  pinned: { type: Boolean, default: false },
  status: { type: String, default: "active" },
  lastActivityAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Thread", ThreadSchema);
