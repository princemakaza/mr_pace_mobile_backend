const TrainingProgramPackage = require("../models/training_program_package_model");

class TrainingProgramPackageService {
  // Create a new training program package
  static async createPackage(packageData) {
    try {
      const newPackage = new TrainingProgramPackage(packageData);
      return await newPackage.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all training program packages
  static async getAllPackages() {
    try {
      return await TrainingProgramPackage.find().populate('coach', 'userName email');
    } catch (error) {
      throw error;
    }
  }

  // Get a single package by ID
  static async getPackageById(packageId) {
    try {
      return await TrainingProgramPackage.findById(packageId).populate('coach', 'userName email');
    } catch (error) {
      throw error;
    }
  }

  // Update a package
  static async updatePackage(packageId, updateData) {
    try {
      return await TrainingProgramPackage.findByIdAndUpdate(
        packageId,
        updateData,
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Delete a package
  static async deletePackage(packageId) {
    try {
      return await TrainingProgramPackage.findByIdAndDelete(packageId);
    } catch (error) {
      throw error;
    }
  }

  // Get packages by coach
  static async getPackagesByCoach(coachId) {
    try {
      return await TrainingProgramPackage.find({ coach: coachId }).populate('coach', 'userName email');
    } catch (error) {
      throw error;
    }
  }

  // Get packages by difficulty level
  static async getPackagesByDifficulty(difficulty) {
    try {
      return await TrainingProgramPackage.find({ difficultyLevel: difficulty });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TrainingProgramPackageService;