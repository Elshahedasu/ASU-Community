import express from "express";
import {
    getAllCoursesAdmin,
    createCourseAdmin,
    updateCourseAdmin,
    addInstructorToCourse,
    removeInstructorFromCourse,
    deleteCourseAdmin,
} from "../Controllers/adminCourseController.js";

const router = express.Router();

router.get("/", getAllCoursesAdmin);
router.post("/", createCourseAdmin); // ✅ REQUIRED
router.patch("/:courseId", updateCourseAdmin);
router.patch("/:courseId/instructors/add", addInstructorToCourse);
router.patch("/:courseId/instructors/remove", removeInstructorFromCourse);
router.delete("/:courseId", deleteCourseAdmin);

export default router;