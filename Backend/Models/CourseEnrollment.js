import mongoose from "mongoose";

const CourseEnrollmentSchema = new mongoose.Schema({
    _id: {
        type: String, // "E3001"
        required: true,
    },
    userID: {
        type: String, // "U1001"
        required: true,
    },
    courseID: {
        type: String, // "C200"
        required: true,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("course_enrollments", CourseEnrollmentSchema);