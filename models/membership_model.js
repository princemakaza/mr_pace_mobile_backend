const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
    unique: true,
  },
  membershipType: {
    type: String,
    enum: ["athlete", "coach", "official"],
    required: true,
    default: "athlete"
  },
  membershipStatus: {
    type: String,
    enum: ["pending", "active", "rejected", "graduated"],
    default: "pending",
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // the admin or coach who approved
    required: false,
  },
  graduationDate: {
    type: Date,
    required: false,
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
  remarks: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Membership", membershipSchema);
