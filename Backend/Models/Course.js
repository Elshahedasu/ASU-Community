import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: String,
  code: String,
  description: String,
  instructorIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", CourseSchema);
