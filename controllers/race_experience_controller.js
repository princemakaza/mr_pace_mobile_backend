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
      const experience = await RaceExperienceService.getExperienceById(req.params.id);
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
      const experiences = await RaceExperienceService.getExperiencesByRace(req.params.raceId);
      res.json(experiences);
    } catch (error) {
      next(error);
    }
  }

  static async getExperiencesByUser(req, res, next) {
    try {
      const experiences = await RaceExperienceService.getExperiencesByUser(req.params.userId);
      res.json(experiences);
    } catch (error) {
      next(error);
    }
  }

  static async updateExperience(req, res, next) {
    try {
      const experience = await RaceExperienceService.updateExperience(req.params.id, req.body);
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
      const experience = await RaceExperienceService.deleteExperience(req.params.id);
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
      const experience = await RaceExperienceService.likeExperience(req.params.id, req.user.id);
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
      const { comment } = req.body;
      if (!comment) {
        return res.status(400).json({ message: "Comment is required" });
      }
      const experience = await RaceExperienceService.addComment(req.params.id, req.user.id, comment);
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