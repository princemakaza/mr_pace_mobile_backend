const InjurySolutionPurchase = require("../models/injury_solution_purchase_model");
const InjuryExerciseSolution = require("../models/injury_exercise_solution_model");
const User = require("../models/user_model");

class InjurySolutionPurchaseService {
  // Create a new purchase record
  static async createPurchase(purchaseData) {
    try {
      // Verify the solution exists
      const solutionExists = await InjuryExerciseSolution.findById(
        purchaseData.injury_solution_id
      );
      if (!solutionExists) {
        throw new Error("Injury exercise solution not found");
      }

      // Verify the user exists
      const userExists = await User.findById(purchaseData.userId);
      if (!userExists) {
        throw new Error("User not found");
      }

      const newPurchase = new InjurySolutionPurchase(purchaseData);
      return await newPurchase.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all purchases
  static async getAllPurchases() {
    try {
      return await InjurySolutionPurchase.find()
        .populate("userId", "userName email")
        .populate("injury_solution_id", "injuryType price");
    } catch (error) {
      throw error;
    }
  }

  // Get purchase by ID
  static async getPurchaseById(purchaseId) {
    try {
      return await InjurySolutionPurchase.findById(purchaseId)
        .populate("userId", "userName email")
        .populate("injury_solution_id");
    } catch (error) {
      throw error;
    }
  }

  // ✅ New: Update purchase by ID (generic update)
  static async updatePurchaseById(purchaseId, updateData) {
    try {
      return await InjurySolutionPurchase.findByIdAndUpdate(
        purchaseId,
        updateData,
        { new: true } // return updated document
      )
        .populate("userId", "userName email")
        .populate("injury_solution_id", "injuryType price");
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  static async updatePaymentStatus(purchaseId, newStatus, pollUrl = null) {
    try {
      const updateData = { paymentStatus: newStatus };
      if (pollUrl) updateData.pollUrl = pollUrl;

      return await InjurySolutionPurchase.findByIdAndUpdate(
        purchaseId,
        updateData,
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by user
  static async getPurchasesByUser(userId) {
    try {
      return await InjurySolutionPurchase.find({ userId }).populate(
        "injury_solution_id",
        "injuryType description price"
      );
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by solution
  static async getPurchasesBySolution(solutionId) {
    try {
      return await InjurySolutionPurchase.find({
        injury_solution_id: solutionId,
      }).populate("userId", "userName email");
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by payment status
  static async getPurchasesByStatus(status) {
    try {
      return await InjurySolutionPurchase.find({ paymentStatus: status })
        .populate("userId", "userName email")
        .populate("injury_solution_id", "injuryType price");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InjurySolutionPurchaseService;
