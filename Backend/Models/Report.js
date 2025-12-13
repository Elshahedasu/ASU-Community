import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  reporterID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetID: mongoose.Schema.Types.ObjectId,
  targetType: { type: String, enum: ["post", "reply", "question"] },
  reason: String,
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", ReportSchema);
