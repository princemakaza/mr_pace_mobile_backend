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
    type: String, // Optional payment poll URL
    default: "not available",
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
