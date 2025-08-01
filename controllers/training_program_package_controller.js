const TrainingProgramPackageService = require("../services/training_program_package_service");

class TrainingProgramPackageController {
  static async createPackage(req, res, next) {
    try {
      const packageData = req.body;
      const newPackage = await TrainingProgramPackageService.createPackage(packageData);
      return res.status(201).json(newPackage);
    } catch (error) {
      next(error);
    }
  }

  static async getAllPackages(req, res, next) {
    try {
      const packages = await TrainingProgramPackageService.getAllPackages();
      return res.status(200).json(packages);
    } catch (error) {
      next(error);
    }
  }

  static async getPackageById(req, res, next) {
    try {
      const packageId = req.params.id;
      const packageTraining = await TrainingProgramPackageService.getPackageById(packageId);
      if (!packageTraining) {
        return res.status(404).json({ message: "Package not found" });
      }
      return res.status(200).json(packageTraining);
    } catch (error) {
      next(error);
    }
  }

  static async updatePackage(req, res, next) {
    try {
      const packageId = req.params.id;
      const updateData = req.body;
      const updatedPackage = await TrainingProgramPackageService.updatePackage(packageId, updateData);
      if (!updatedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      return res.status(200).json(updatedPackage);
    } catch (error) {
      next(error);
    }
  }

  static async deletePackage(req, res, next) {
    try {
      const packageId = req.params.id;
      const deletedPackage = await TrainingProgramPackageService.deletePackage(packageId);
      if (!deletedPackage) {
        return res.status(404).json({ message: "Package not found" });
      }
      return res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async getPackagesByCoach(req, res, next) {
    try {
      const coachId = req.params.coachId;
      const packages = await TrainingProgramPackageService.getPackagesByCoach(coachId);
      return res.status(200).json(packages);
    } catch (error) {
      next(error);
    }
  }

  static async getPackagesByDifficulty(req, res, next) {
    try {
      const difficulty = req.params.difficulty;
      const packages = await TrainingProgramPackageService.getPackagesByDifficulty(difficulty);
      return res.status(200).json(packages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainingProgramPackageController;