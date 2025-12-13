import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "instructor", "admin"] },
  institutionID: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  displayName: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
