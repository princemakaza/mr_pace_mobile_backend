const mongoose = require("mongoose");

const trainingProgramSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Must be a coach or admin
    required: true,
  },
  athletes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Should be athlete role
    required: true,
  }],
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "completed", "cancelled"],
    default: "active"
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("TrainingProgram", trainingProgramSchema);
