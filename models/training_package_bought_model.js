const mongoose = require("mongoose");

const trainingPackageBoughtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  training_program_package_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TrainingProgramPackage",
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: [
      "paid",
      "pending",
      "failed",
      "unpaid",
      "cancelled",
      "sent",
      "awaiting_delivery",
      "awaiting_confirmation",
    ],
    default: "pending",
  },
  pollUrl: {
    type: String,
    default: "not available",
  },
  pricePaid: {
    type: Number,
    required: true,
  },
  boughtAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "TrainingPackageBought",
  trainingPackageBoughtSchema
);
