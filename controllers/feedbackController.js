const mongoose = require("mongoose");
const Feedback = require("../models/feedback");
const Vote = require("../models/vote");

const getFeedbacks = async (req, res) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
};

const addFeedback = async (req, res) => {
  try {
    const { title, description } = req.body;
    const feedback = new Feedback({ title, description, user: req.user.id });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Failed to add feedback" });
  }
};

const voteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id; 
    const userId = req.user.id;

    const existingVote = await Vote.findOne({ user_id: userId, feedback_id: feedbackId });
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    if (existingVote) {
      await Vote.deleteOne({ _id: existingVote._id });
      feedback.votes_count -= 1;
    } else {
      const vote = new Vote({ user_id: userId, feedback_id: feedbackId });
      await vote.save();
      feedback.votes_count += 1;
    }

    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { status } = req.body;
    const feedbackId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(feedbackId))
      return res.status(400).json({ message: "Invalid feedback ID" });

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });

    feedback.status = status;
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getFeedbacks, addFeedback, voteFeedback, updateFeedback };
