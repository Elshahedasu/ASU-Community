import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  actionType: String,
  targetID: mongoose.Schema.Types.ObjectId,
  detail: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("ActivityLog", ActivityLogSchema);
