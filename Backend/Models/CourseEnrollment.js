import mongoose from "mongoose";

const CourseEnrollmentSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseID: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  enrolledAt: { type: Date, default: Date.now }
});

export default mongoose.model("CourseEnrollment", CourseEnrollmentSchema);
