import Course from "../Models/Course.js";

/* =========================
   GET ALL COURSES
========================= */
export const getAllCourses = async(req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   GET COURSE BY ID
========================= */
export const getCourseById = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   CREATE COURSE
========================= */
export const createCourse = async(req, res) => {
    try {
        const { title, code, description } = req.body;

        if (!title || !code) {
            return res.status(400).json({ message: "Title and code are required" });
        }

        const exists = await Course.findOne({ code });
        if (exists) {
            return res.status(409).json({ message: "Course code already exists" });
        }

        const course = await Course.create({
            title,
            code,
            description,
            createdAt: new Date(),
        });

        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   UPDATE COURSE
========================= */
export const updateCourse = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        if (req.body.title !== undefined) {
            course.title = req.body.title;
        }

        if (req.body.description !== undefined) {
            course.description = req.body.description;
        }

        await course.save();
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   DELETE COURSE
========================= */
export const deleteCourse = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        await course.deleteOne();
        res.status(200).json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};