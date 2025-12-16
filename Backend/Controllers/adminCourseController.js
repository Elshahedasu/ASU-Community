import Course from "../Models/Course.js";
import Enrollment from "../Models/CourseEnrollment.js";
import User from "../Models/User.js";

/* =========================
   GET ALL COURSES + STATS
========================= */
export const getAllCoursesAdmin = async(req, res) => {
    try {
        const courses = await Course.aggregate([{
                $lookup: {
                    from: "course_enrollments",
                    localField: "_id",
                    foreignField: "courseID",
                    as: "enrollments",
                },
            },
            {
                $addFields: {
                    totalStudents: { $size: "$enrollments" },
                },
            },
            {
                $project: {
                    enrollments: 0,
                },
            },
        ]);

        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   CREATE COURSE (ADMIN) ✅ FIX
========================= */
export const createCourseAdmin = async(req, res) => {
    try {
        const {
            _id,
            title,
            code,
            description,
            instructorIds,
            term,
        } = req.body;

        if (!_id ||
            !title ||
            !code ||
            !term ||
            !Array.isArray(instructorIds) ||
            instructorIds.length === 0
        ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const exists = await Course.findById(_id);
        if (exists) {
            return res.status(400).json({ message: "Course ID already exists" });
        }

        const course = await Course.create({
            _id,
            title,
            code,
            description,
            instructorIds,
            term,
            status: "active",
        });

        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   UPDATE COURSE STATUS / INFO
========================= */
export const updateCourseAdmin = async(req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.courseId,
            req.body, { new: true }
        );

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   ADD INSTRUCTOR
========================= */
export const addInstructorToCourse = async(req, res) => {
    try {
        const { instructorId } = req.body;

        const instructor = await User.findById(instructorId);
        if (!instructor || instructor.role !== "instructor") {
            return res.status(400).json({ message: "Invalid instructor ID" });
        }

        const course = await Course.findByIdAndUpdate(
            req.params.courseId, { $addToSet: { instructorIds: instructorId } }, { new: true }
        );

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   REMOVE INSTRUCTOR
========================= */
export const removeInstructorFromCourse = async(req, res) => {
    try {
        const { instructorId } = req.body;

        const course = await Course.findByIdAndUpdate(
            req.params.courseId, { $pull: { instructorIds: instructorId } }, { new: true }
        );

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   DELETE COURSE
========================= */
export const deleteCourseAdmin = async(req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.courseId);
        await Enrollment.deleteMany({ courseID: req.params.courseId });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};