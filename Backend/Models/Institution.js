import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema({
  name: String,
  location: String,
  contact: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Institution", InstitutionSchema);
