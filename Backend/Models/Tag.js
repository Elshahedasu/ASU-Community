import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  aliases: [String],
  parentTagID: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
});

export default mongoose.model("Tag", TagSchema);

