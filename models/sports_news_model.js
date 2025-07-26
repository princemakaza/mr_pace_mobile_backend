const mongoose = require("mongoose");

const sportsNewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    moreImages: [{
      type: String,
      required: false,
    }],
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Football",
        "Cricket",
        "Basketball",
        "Rugby",
        "Tennis",
        "Athletics",
        "Boxing",
        "Formula 1",
        "Golf",
        "Other"
      ],
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SportsNews", sportsNewsSchema);
