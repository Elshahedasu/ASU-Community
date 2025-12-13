import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  targetID: mongoose.Schema.Types.ObjectId,
  targetType: { type: String, enum: ["question", "reply"] },
  voteType: { type: String, enum: ["up", "down"] },
  createdAt: { type: Date, default: Date.now }
});

VoteSchema.index({ userID: 1, targetID: 1 }, { unique: true });

export default mongoose.model("Vote", VoteSchema);
