const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const cors = require("cors");

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

const WorkoutSchema = new mongoose.Schema({
  userId: String,
  exercise: String,
  setNumber: Number,
  weight: Number,
  reps: Number,
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

router.post("/workout", async (req, res) => {
  try {
    const { userId, exercise, setNumber, weight, reps } = req.body;
    const workout = await Workout.findOneAndUpdate(
      { userId, exercise, setNumber },
      { weight, reps },
      { upsert: true, new: true }
    ).maxTimeMS(5000);

    res.status(201).json(workout);
  } catch (error) {
    console.error("Save error:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/workout/:userId", async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.params.userId,
    }).maxTimeMS(5000);

    res.json(workouts || []);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
