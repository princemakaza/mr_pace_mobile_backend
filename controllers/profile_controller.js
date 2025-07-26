const profileService = require("../services/profile_services");

// Create a profile
exports.createProfile = async (req, res) => {
    try {
        const profile = await profileService.createProfile(req.body);
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get profile by ID
exports.getProfileById = async (req, res) => {
    try {
        const profile = await profileService.getProfileById(req.params.id);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get profile by userId
exports.getProfileByUserId = async (req, res) => {
    try {
        const profile = await profileService.getProfileByUserId(req.params.userId);
        if (!profile) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const updated = await profileService.updateProfile(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
    try {
        const deleted = await profileService.deleteProfile(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Check if profile exists by userId
exports.profileExists = async (req, res) => {
    try {
        const exists = await profileService.profileExists(req.params.userId);
        res.status(200).json({ exists });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
