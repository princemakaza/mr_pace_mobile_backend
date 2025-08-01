const mongoose = require("mongoose");

const coachingCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverImage: {
    type: String, // Course banner or thumbnail image URL
  },
  date: {
    type: Date,
    required: true,
  },
  durationInHours: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true, // max number of attendees
  },
  location: {
    type: String, // can be "Online" or physical address
    required: true,
  },
  platformLink: {
    type: String, // Zoom/Google Meet link (for online)
  },
  price: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
  },
  difficultyLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
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

// Auto-update updatedAt field before saving
coachingCourseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("CoachingCourse", coachingCourseSchema);
