import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  content: String,
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Post", PostSchema);
