import mongoose from "mongoose";

const ThreadSubscriptionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  threadID: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
  createdAt: { type: Date, default: Date.now }
});

ThreadSubscriptionSchema.index(
  { userID: 1, threadID: 1 },
  { unique: true }
);

export default mongoose.model("ThreadSubscription", ThreadSubscriptionSchema);
