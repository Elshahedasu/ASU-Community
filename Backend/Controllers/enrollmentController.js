import CourseEnrollment from "../Models/CourseEnrollment.js";
import ActivityLog from "../Models/ActivityLog.js";

/* ======================================================
   STUDENT ENROLL IN COURSE
====================================================== */
export const enrollInCourse = async(req, res) => {
    try {
        const { userId, courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({ message: "Missing data" });
        }

        const exists = await CourseEnrollment.findOne({
            userID: userId,
            courseID: courseId,
        });

        if (exists) {
            return res.status(409).json({ message: "Already enrolled" });
        }

        const enrollment = await CourseEnrollment.create({
            _id: `E-${Date.now()}`,
            userID: userId,
            courseID: courseId,
            enrolledAt: new Date(),
        });

        await ActivityLog.create({
            _id: `AL-${Date.now()}`,
            userID: userId,
            actionType: "enrolled_course",
            targetID: courseId,
            detail: "Student enrolled in course",
        });

        res.status(201).json(enrollment);
    } catch (err) {
        console.error("ENROLL ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};

/* ======================================================
   GET ENROLLED COURSES FOR STUDENT
====================================================== */
export const getEnrolledCoursesForStudent = async(req, res) => {
    try {
        const { userId } = req.params;

        const enrollments = await CourseEnrollment.find({
            userID: userId,
        });

        res.status(200).json(enrollments);
    } catch (err) {
        console.error("FETCH ENROLLED COURSES ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};
/* ======================================================
   STUDENT DROP COURSE
====================================================== */
export const dropCourse = async(req, res) => {
    try {
        const { userId, courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({ message: "Missing data" });
        }

        const deleted = await CourseEnrollment.findOneAndDelete({
            userID: userId,
            courseID: courseId,
        });

        if (!deleted) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        await ActivityLog.create({
            _id: `AL-${Date.now()}`,
            userID: userId,
            actionType: "dropped_course",
            targetID: courseId,
            detail: "Student dropped course",
        });

        res.json({ message: "Course dropped successfully" });
    } catch (err) {
        console.error("DROP COURSE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
};