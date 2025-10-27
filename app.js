const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const { register, login } = require("./controllers/authController");
const { getFeedbacks, addFeedback, voteFeedback, updateFeedback } = require("./controllers/feedbackController");
const authMiddleware = require("./middleware/auth");

const app = express();
app.use(
  cors({
    origin: "https://68ff0c81433d7800082d7da0--feedbackfrontend.netlify.app", // your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


app.post("/register", register);
app.post("/login", login);


app.get("/feedbacks", authMiddleware, getFeedbacks);
app.post("/feedbacks", authMiddleware, addFeedback);
app.post("/feedbacks/:id/vote", authMiddleware, voteFeedback);
app.put("/feedbacks/:id", authMiddleware, updateFeedback);


// app.get("/", (req, res) => res.send("Backend is running"));

module.exports = app;
