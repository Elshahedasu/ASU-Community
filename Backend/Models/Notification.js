import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  payload: Object,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", NotificationSchema);
