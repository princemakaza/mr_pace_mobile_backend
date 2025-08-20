const mongoose = require("mongoose");

const courseBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CoachingCourse",
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
    required: true,
  },
  pollUrl: {
    type: String, // Optional: link to check payment status
  },
  pricePaid: {
    type: Number,
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  },
  attendanceStatus: {
    type: String,
    enum: ["not attended", "attended", "cancelled"],
    default: "not attended",
  }
});

module.exports = mongoose.model("CourseBooking", courseBookingSchema);
