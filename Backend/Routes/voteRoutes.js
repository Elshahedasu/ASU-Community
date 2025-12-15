import express from "express";
import { voteReply } from "../Controllers/voteController.js";

const router = express.Router();

router.post("/reply", voteReply);

export default router;