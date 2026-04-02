const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB");

// Schema
const Feedback = mongoose.model("Feedback", {
  name: String,
  occupation: String,
  rating: String,
  feedback: String
});

// API
app.post("/api/feedback", async (req, res) => {
  const data = new Feedback(req.body);
  await data.save();
  res.send("Saved");
});
// GET all feedback
app.get("/api/feedback", async (req, res) => {
  const data = await Feedback.find().sort({ _id: -1 });
  res.json(data);
});

app.listen(5000, () => console.log("Server running on port 5000"));