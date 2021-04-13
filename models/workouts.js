const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
    day: {type: Date, default: () => new Date()},
    exercises: {
  name: {
    type: String,
    trim: true,
    required: "Enter a name for workouts"
  },
  duration: {
    type: Number,
    required: "Enter Description"
  },
  weight: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  sets: {
    type: Number,
  },
  distance: {
type: Number,
  },
}
});

const Workouts = mongoose.model("Workouts", workoutsSchema);

module.exports = Workouts;
