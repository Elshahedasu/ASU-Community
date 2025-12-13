import mongoose from "mongoose";

const AttachmentSchema = new mongoose.Schema({
  ownerID: mongoose.Schema.Types.ObjectId,
  filename: String,
  url: String,
  mime: String,
  size: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Attachment", AttachmentSchema);
