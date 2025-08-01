const mongoose = require("mongoose");

const dailyTrainingSchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workoutPlan: {
    type: String,
    required: true,
  },
  durationInMinutes: {
    type: Number,
    required: true,
  },
  intensityLevel: {
    type: String,
    enum: ["Low", "Moderate", "High", "Very High"],
    required: true,
  },
  images: [{
    type: String, // URLs to stored images
  }],
  notes: {
    type: String,
  },
  isRestDay: {
    type: Boolean,
    default: false,
  },
});

const trainingProgramPackageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String, // URL to the main cover image
  },
  durationInWeeks: {
    type: Number,
    required: true,
  },
  dailyTrainings: [dailyTrainingSchema], // Array of daily training programs
  targetRaceType: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Elite"],
    required: true,
  },
  coachBiography: {
    type: String,
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  galleryImages: [{
    type: String, // Additional images for the program
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
trainingProgramPackageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model(
  "TrainingProgramPackage",
  trainingProgramPackageSchema
);