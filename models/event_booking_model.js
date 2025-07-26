const mongoose = require("mongoose");

const eventBookingSchema = new mongoose.Schema({
  organizerName: {
    type: String,
    required: true,
  },
  organizerEmail: {
    type: String,
    required: true,
  },
  organizerPhone: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String, // You can change to Date type if needed
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  expectedParticipants: {
    type: Number,
    required: true,
  },
  supportRequested: [{
    type: String,
    enum: [
      "Race Coordination",
      "Logistics",
      "Timekeeping",
      "MC/Announcements",
      "Marketing",
      "Sponsorship",
      "Volunteers",
      "Medals & Prizes",
      "Other"
    ],
    required: false,
  }],
  additionalNotes: {
    type: String,
    required: false,
  },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Cancelled"],
    default: "Pending",
  }
}, { timestamps: true }); // 👈 This enables createdAt and updatedAt

module.exports = mongoose.model("eventBookings", eventBookingSchema);
