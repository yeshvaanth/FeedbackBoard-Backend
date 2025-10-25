const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  feedback_id: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
}, { timestamps: true });

module.exports = mongoose.model("Vote", voteSchema);
