import User from "../Models/User.js";
import Enrollment from "../Models/CourseEnrollment.js";
import Thread from "../Models/Thread.js";
import ActivityLog from "../Models/ActivityLog.js";

/* =========================
   USERS + ENROLLMENTS
========================= */
export const getUsersWithEnrollments = async(req, res) => {
    try {
        const users = await User.aggregate([{
                $lookup: {
                    from: "course_enrollments",
                    localField: "_id",
                    foreignField: "userID",
                    as: "enrollments",
                },
            },
            {
                $addFields: {
                    enrolledCourses: { $size: "$enrollments" },
                },
            },
            {
                $project: {
                    enrollments: 0,
                },
            },
        ]);

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   UPDATE USER STATUS
========================= */
export const updateUserStatus = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId, { status: req.body.status }, { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   DELETE USER
========================= */
export const deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        await Enrollment.deleteMany({ userID: req.params.userId });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   ALL THREADS
========================= */
export const getAllThreadsAdmin = async(req, res) => {
    try {
        const threads = await Thread.find();
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =========================
   ACTIVITY LOGS
========================= */
export const getActivityLogs = async(req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};