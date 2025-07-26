const mongoose = require("mongoose");

const raceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
  description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: false,
  },
  registrationPrice: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  RegistrationStatus: {
    type: String,
    enum: ["Open", "Closed", "Postponed"],
    default: "Open",
  },
  date: {
    type: String,
    required: true,
  },
  raceEvents: [{
    distanceRace: {
        type: String,
        required: false,
    },
    reachLimit: {
        type: String,
        required: false,
    }
    }],   
});

module.exports = mongoose.model("races", raceSchema);