import express from "express";
import {
    enrollInCourse,
    getEnrolledCoursesForStudent,
    dropCourse,
} from "../Controllers/enrollmentController.js";

const router = express.Router();

/**
 * Enroll in course
 */
router.post("/enroll", enrollInCourse);

/**
 * Get enrolled courses for student
 */
router.get("/student/:userId", getEnrolledCoursesForStudent);

/**
 * Drop course
 */
router.post("/drop", dropCourse);

export default router;