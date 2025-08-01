const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String, // link to video demo
  },
    images: [{
    type: String, // URLs to stored images
  }],
  description: {
    type: String,
  },
  repetitions: {
    type: String, // e.g., "3 sets of 15 reps"
  },
});

const nutrientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  benefit: {
    type: String,
  },
  recommendedFoods: [{
    type: String, // e.g., "Spinach", "Salmon"
  }],
});

const injuryExerciseSolutionSchema = new mongoose.Schema({
  injuryType: {
    type: String,
    required: true, // e.g., "Shin Splints", "Runner's Knee"
  },
  description: {
    type: String,
    required: true,
  },
  exercises: [exerciseSchema],
  nutrients: [nutrientSchema],
  difficultyLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  price: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
  },
  coverImage: {
    type: String, // Cover image for the solution
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt before save
injuryExerciseSolutionSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model(
  "InjuryExerciseSolution",
  injuryExerciseSolutionSchema
);
