const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    profilePicture: {
        type: String, // store image URL or path
        default: ""
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    nationalId: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    tShirtSize: {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: false
    },
    address: {
        type: String,
        required: false
    },
    emergencyContact: {
        name: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        relationship: {
            type: String,
            required: false
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Profile", profileSchema);
