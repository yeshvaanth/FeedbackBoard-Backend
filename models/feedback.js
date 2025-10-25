const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["Planned","In Progress","Completed","Rejected"], default: "Planned" },
  votes_count: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
