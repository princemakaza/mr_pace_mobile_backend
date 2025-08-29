const RaceExperienceService = require("../services/race_experience_service");

class RaceExperienceController {
  static async createExperience(req, res, next) {
    try {
      const experience = await RaceExperienceService.createExperience(req.body);
      res.status(201).json(experience);
    } catch (error) {
      next(error);
    }
  }

  static async getAllExperiences(req, res, next) {
    try {
      const experiences = await RaceExperienceService.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      next(error);
    }
  }

  static async getExperienceById(req, res, next) {
    try {
      const experience = await RaceExperienceService.getExperienceById(
        req.params.id
      );
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      next(error);
    }
  }

  static async getExperiencesByRace(req, res, next) {
    try {
      const experiences = await RaceExperienceService.getExperiencesByRace(
        req.params.raceId
      );
      res.json(experiences);
    } catch (error) {
      next(error);
    }
  }

  static async getExperiencesByUser(req, res, next) {
    try {
      const experiences = await RaceExperienceService.getExperiencesByUser(
        req.params.userId
      );
      res.json(experiences);
    } catch (error) {
      next(error);
    }
  }

  static async updateExperience(req, res, next) {
    try {
      const experience = await RaceExperienceService.updateExperience(
        req.params.id,
        req.body
      );
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      next(error);
    }
  }

  static async deleteExperience(req, res, next) {
    try {
      const experience = await RaceExperienceService.deleteExperience(
        req.params.id
      );
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json({ message: "Experience deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async likeExperience(req, res, next) {
    try {
      const { userId } = req.query; // Get user ID from query parameter
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const experience = await RaceExperienceService.likeExperience(
        req.params.id,
        userId // Use user ID from query parameter
      );

      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      next(error);
    }
  }

  static async addComment(req, res, next) {
    try {
      const { comment, userId } = req.body; // Get user ID from request body
      if (!comment) {
        return res.status(400).json({ message: "Comment is required" });
      }
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const experience = await RaceExperienceService.addComment(
        req.params.id,
        userId, // Use user ID from request body
        comment
      );

      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RaceExperienceController;
