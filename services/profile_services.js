const Profile = require("../models/profile_model");

// Create a profile
exports.createProfile = async (profileData) => {
    const profile = new Profile(profileData);
    return await profile.save();
};

// Get all profiles
exports.getAllProfiles = async () => {
    return await Profile.find().populate("userId");
};

// Get profile by ID
exports.getProfileById = async (id) => {
    return await Profile.findById(id).populate("userId");
};

// Get profile by userId
exports.getProfileByUserId = async (userId) => {
    return await Profile.findOne({ userId }).populate("userId");
};

// Update profile by ID
exports.updateProfile = async (id, updateData) => {
    return await Profile.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete profile by ID
exports.deleteProfile = async (id) => {
    return await Profile.findByIdAndDelete(id);
};

// Check if profile exists by userId (for frontend validations)
exports.profileExists = async (userId) => {
    return await Profile.exists({ userId });
};
