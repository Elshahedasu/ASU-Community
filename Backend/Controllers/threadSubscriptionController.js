import ThreadSubscription from "../Models/ThreadSubscription.js";
import ActivityLog from "../Models/ActivityLog.js";

/* ======================================================
   STUDENT SUBSCRIBE TO THREAD
====================================================== */
export const subscribeToThread = async(req, res) => {
    try {
        const { userId, threadId } = req.body;

        if (!userId || !threadId) {
            return res.status(400).json({ message: "Missing data" });
        }

        const exists = await ThreadSubscription.findOne({
            userID: userId,
            threadID: threadId,
        });

        if (exists) {
            return res.status(409).json({ message: "Already subscribed" });
        }

        const subscription = await ThreadSubscription.create({
            _id: `TS-${Date.now()}`,
            userID: userId,
            threadID: threadId,
            createdAt: new Date(),
        });

        await ActivityLog.create({
            _id: `AL-${Date.now()}`,
            userID: userId,
            actionType: "subscribed_thread",
            targetID: threadId,
            detail: "Student subscribed to thread",
        });

        res.status(201).json(subscription);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};