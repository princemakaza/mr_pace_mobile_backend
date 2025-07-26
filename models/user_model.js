const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["athlete", "coach", "admin"],
        required: true
    }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Hash password before updating a user
userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    
    // Check if password is being updated
    if (update.password) {
        update.password = await bcrypt.hash(update.password, 10);
    }
    
    next();
});

module.exports = mongoose.model("User", userSchema);