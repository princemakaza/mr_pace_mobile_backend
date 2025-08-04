const mongoose = require("mongoose");
const { updatePollUrl } = require("../services/registration_service");

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
    enum: ["pending", "completed", "failed"],
    required: true,
    default: "pending",
  },
  pollUrl: {
    type: String,
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
