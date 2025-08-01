const InjuryExerciseSolution = require("../models/injury_exercise_solution_model");
const User = require("../models/user_model");

class InjuryExerciseSolutionService {
  // Create a new injury solution
  static async createSolution(solutionData) {
    try {
      // Verify coach exists if provided
      if (solutionData.coach) {
        const coachExists = await User.findById(solutionData.coach);
        if (!coachExists) {
          throw new Error("Coach not found");
        }
      }

      const newSolution = new InjuryExerciseSolution(solutionData);
      return await newSolution.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all solutions
  static async getAllSolutions() {
    try {
      return await InjuryExerciseSolution.find().populate("coach", "userName email");
    } catch (error) {
      throw error;
    }
  }

  // Get solution by ID
  static async getSolutionById(solutionId) {
    try {
      return await InjuryExerciseSolution.findById(solutionId).populate("coach", "userName email");
    } catch (error) {
      throw error;
    }
  }

  // Update a solution
  static async updateSolution(solutionId, updateData) {
    try {
      // Verify coach exists if being updated
      if (updateData.coach) {
        const coachExists = await User.findById(updateData.coach);
        if (!coachExists) {
          throw new Error("Coach not found");
        }
      }

      return await InjuryExerciseSolution.findByIdAndUpdate(
        solutionId,
        updateData,
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Delete a solution
  static async deleteSolution(solutionId) {
    try {
      return await InjuryExerciseSolution.findByIdAndDelete(solutionId);
    } catch (error) {
      throw error;
    }
  }

  // Get solutions by injury type
  static async getSolutionsByInjuryType(injuryType) {
    try {
      return await InjuryExerciseSolution.find({ 
        injuryType: { $regex: new RegExp(injuryType, 'i') } 
      });
    } catch (error) {
      throw error;
    }
  }

  // Get solutions by difficulty level
  static async getSolutionsByDifficulty(difficulty) {
    try {
      return await InjuryExerciseSolution.find({ difficultyLevel: difficulty });
    } catch (error) {
      throw error;
    }
  }

  // Get solutions by coach
  static async getSolutionsByCoach(coachId) {
    try {
      return await InjuryExerciseSolution.find({ coach: coachId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = InjuryExerciseSolutionService;