const TrainingPackageBought = require("../models/training_package_bought_model");
const TrainingProgramPackage = require("../models/training_program_package_model");
const User = require("../models/user_model");

class TrainingPackageBoughtService {
  // Create a new purchase record
  static async createPurchase(purchaseData) {
    try {
      // Verify the package exists
      const packageExists = await TrainingProgramPackage.findById(
        purchaseData.training_program_package_id
      );
      if (!packageExists) {
        throw new Error("Training program package not found");
      }

      // Verify the user exists
      const userExists = await User.findById(purchaseData.userId);
      if (!userExists) {
        throw new Error("User not found");
      }

      const newPurchase = new TrainingPackageBought(purchaseData);
      return await newPurchase.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all purchases
  static async getAllPurchases() {
    try {
      return await TrainingPackageBought.find()
        .populate("userId", "userName email")
        .populate("training_program_package_id", "title price");
    } catch (error) {
      throw error;
    }
  }

  // Get purchase by ID
  static async getPurchaseById(purchaseId) {
    try {
      return await TrainingPackageBought.findById(purchaseId)
        .populate("userId", "userName email")
        .populate("training_program_package_id", "title price description");
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  static async updatePaymentStatus(purchaseId, newStatus) {
    try {
      return await TrainingPackageBought.findByIdAndUpdate(
        purchaseId,
        { paymentStatus: newStatus },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by user
  static async getPurchasesByUser(userId) {
    try {
      return await TrainingPackageBought.find({ userId }).populate(
        "training_program_package_id",
      );
    } catch (error) {
      throw error;
    }
  }

  // Add this method to your TrainingPackageBoughtService class
  static async updatePurchase(purchaseId, updateData) {
    try {
      return await TrainingPackageBought.findByIdAndUpdate(
        purchaseId,
        updateData,
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by package
  static async getPurchasesByPackage(packageId) {
    try {
      return await TrainingPackageBought.find({
        training_program_package_id: packageId,
      }).populate("userId", "userName email");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TrainingPackageBoughtService;
