const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Verbindung
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB verbunden"))
  .catch((err) => console.error("MongoDB Verbindungsfehler:", err));

// Schema
const WorkoutSchema = new mongoose.Schema({
  userId: String,
  exercise: String,
  setNumber: Number,
  weight: Number,
  reps: Number,
  date: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

// Routes
app.post("/api/workout", async (req, res) => {
  try {
    const { userId, exercise, setNumber, weight, reps } = req.body;
    const workout = await Workout.findOneAndUpdate(
      { userId, exercise, setNumber },
      { $set: { weight, reps } },
      { upsert: true, new: true }
    );
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/workout/:userId", async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
