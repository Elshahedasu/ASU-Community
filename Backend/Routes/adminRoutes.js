import express from "express";
import {
    getUsersWithEnrollments,
    updateUserStatus,
    deleteUser,
    getAllThreadsAdmin,
    getActivityLogs,
} from "../Controllers/adminController.js";

const router = express.Router();

/* USERS */
router.get("/users", getUsersWithEnrollments);
router.patch("/users/:userId/status", updateUserStatus);
router.delete("/users/:userId", deleteUser);

/* THREADS */
router.get("/threads", getAllThreadsAdmin);

/* LOGS */
router.get("/logs", getActivityLogs);

export default router;