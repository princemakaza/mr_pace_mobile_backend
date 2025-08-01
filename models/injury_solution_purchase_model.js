const mongoose = require("mongoose");

const injurySolutionPurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  injury_solution_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InjuryExerciseSolution",
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
    default: "pending",
  },
  pollUrl: {
    type: String, // Optional payment poll URL
  },
  pricePaid: {
    type: Number,
    required: true,
  },
  purchasedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "InjurySolutionPurchase",
  injurySolutionPurchaseSchema
);
