import express from "express";

import {
    registerUser,
    loginUser,
    enrollInCourse,
    getMyCourses,
    followThread,
    unfollowThread,
    updateUserProfile
} from "../Controllers/UserController.js";

import User from "../Models/User.js";
import { protect } from "../MiddleWare/auth.js";

const router = express.Router();

/* =========================
   AUTH
========================= */

// Register (student / instructor)
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

/* =========================
   ADMIN (ADDED — NO CHANGES)
========================= */

// ✅ GET ALL USERS (Admin dashboard)
router.get("/", async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ✅ TOGGLE USER STATUS (Admin)
router.patch("/:id/status", async(req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id, { status }, { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* =========================
   USER ACTIONS (Protected)
========================= */

// Enroll in a course
router.post("/enroll", protect, enrollInCourse);

// Get my enrolled courses
router.get("/:userID/courses", protect, getMyCourses);

// Follow a thread
router.post("/follow-thread", protect, followThread);

// Unfollow a thread
router.post("/unfollow-thread", protect, unfollowThread);

// Update user profile
router.patch("/:userID", protect, updateUserProfile);

export default router;