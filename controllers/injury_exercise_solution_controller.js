const InjuryExerciseSolutionService = require("../services/injury_exercise_solution_service");

class InjuryExerciseSolutionController {
  static async createSolution(req, res, next) {
    try {
      const solutionData = req.body;
      const newSolution = await InjuryExerciseSolutionService.createSolution(solutionData);
      return res.status(201).json(newSolution);
    } catch (error) {
      next(error);
    }
  }

  static async getAllSolutions(req, res, next) {
    try {
      const solutions = await InjuryExerciseSolutionService.getAllSolutions();
      return res.status(200).json(solutions);
    } catch (error) {
      next(error);
    }
  }

  static async getSolutionById(req, res, next) {
    try {
      const solutionId = req.params.id;
      const solution = await InjuryExerciseSolutionService.getSolutionById(solutionId);
      if (!solution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      return res.status(200).json(solution);
    } catch (error) {
      next(error);
    }
  }

  static async updateSolution(req, res, next) {
    try {
      const solutionId = req.params.id;
      const updateData = req.body;
      const updatedSolution = await InjuryExerciseSolutionService.updateSolution(solutionId, updateData);
      if (!updatedSolution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      return res.status(200).json(updatedSolution);
    } catch (error) {
      next(error);
    }
  }

  static async deleteSolution(req, res, next) {
    try {
      const solutionId = req.params.id;
      const deletedSolution = await InjuryExerciseSolutionService.deleteSolution(solutionId);
      if (!deletedSolution) {
        return res.status(404).json({ message: "Solution not found" });
      }
      return res.status(200).json({ message: "Solution deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async getSolutionsByInjuryType(req, res, next) {
    try {
      const injuryType = req.params.injuryType;
      const solutions = await InjuryExerciseSolutionService.getSolutionsByInjuryType(injuryType);
      return res.status(200).json(solutions);
    } catch (error) {
      next(error);
    }
  }

  static async getSolutionsByDifficulty(req, res, next) {
    try {
      const difficulty = req.params.difficulty;
      const solutions = await InjuryExerciseSolutionService.getSolutionsByDifficulty(difficulty);
      return res.status(200).json(solutions);
    } catch (error) {
      next(error);
    }
  }

  static async getSolutionsByCoach(req, res, next) {
    try {
      const coachId = req.params.coachId;
      const solutions = await InjuryExerciseSolutionService.getSolutionsByCoach(coachId);
      return res.status(200).json(solutions);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InjuryExerciseSolutionController;