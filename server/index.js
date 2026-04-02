const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connect
mongoose.connect("mongodb+srv://admin:Krishi@123@cluster0.fzzm2wu.mongodb.net/feedbackDB");


// Schema
const Feedback = mongoose.model("Feedback", {
  name: String,
  occupation: String,
  rating: Number,
  feedback: String
});

// POST API
app.post("/api/feedback", async (req, res) => {
  const data = new Feedback(req.body);
  await data.save();
  res.send("Saved");
});

// GET API
app.get("/api/feedback", async (req, res) => {
  const data = await Feedback.find().sort({ _id: -1 });
  res.json(data);
});

// PORT FIX
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));