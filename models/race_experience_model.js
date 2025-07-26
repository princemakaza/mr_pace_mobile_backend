const mongoose = require("mongoose");

const raceExperienceSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Profile" if you want richer data
    required: true,
  },
  membershipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Membership",
    required: true,
  },
  raceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "races",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  experienceText: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // URLs or file paths
    }
  ],
  likes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      likedAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model("RaceExperience", raceExperienceSchema);
