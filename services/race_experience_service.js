const RaceExperience = require("../models/race_experience_model");

class RaceExperienceService {
  static async createExperience(experienceData) {
    try {
      const experience = new RaceExperience(experienceData);
      return await experience.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllExperiences() {
    try {
      return await RaceExperience.find()
        .populate("author", "userName email")
        .populate("raceId")
        .populate("membershipId", "membershipNumber")
        .populate("likes.userId", "userName email")
        .populate("comments.userId", "userName email");
    } catch (error) {
      throw error;
    }
  }

  static async getExperienceById(experienceId) {
    try {
      return await RaceExperience.findById(experienceId)
        .populate("author", "userName email")
        .populate("raceId", "name date")
        .populate("membershipId", "membershipNumber")
        .populate("likes.userId", "userName")
        .populate("comments.userId", "userName");
    } catch (error) {
      throw error;
    }
  }

  static async getExperiencesByRace(raceId) {
    try {
      return await RaceExperience.find({ raceId })
        .populate("author", "userName email")
        .populate("raceId", "name date")
        .populate("membershipId", "membershipNumber");
    } catch (error) {
      throw error;
    }
  }

  static async getExperiencesByUser(userId) {
    try {
      return await RaceExperience.find({ author: userId })
        .populate("author", "userName email")
        .populate("raceId", "name date")
        .populate("membershipId", "membershipNumber")
        .populate("likes.userId", "userName")
        .populate("comments.userId", "userName");
    } catch (error) {
      throw error;
    }
  }

  static async updateExperience(experienceId, updateData) {
    try {
      return await RaceExperience.findByIdAndUpdate(experienceId, updateData, {
        new: true,
      })
        .populate("author", "userName email")
        .populate("raceId", "name date")
        .populate("membershipId", "membershipNumber");
    } catch (error) {
      throw error;
    }
  }

  static async deleteExperience(experienceId) {
    try {
      return await RaceExperience.findByIdAndDelete(experienceId);
    } catch (error) {
      throw error;
    }
  }

  static async likeExperience(experienceId, userId) {
    try {
      const experience = await RaceExperience.findById(experienceId);
      if (!experience) {
        throw new Error("Experience not found");
      }

      // Check if user already liked
      const alreadyLiked = experience.likes.some(
        (like) => like.userId.toString() === userId.toString()
      );

      if (alreadyLiked) {
        // Remove like if already exists
        return await RaceExperience.findByIdAndUpdate(
          experienceId,
          { $pull: { likes: { userId } } },
          { new: true }
        ).populate("likes.userId", "userName email");
      } else {
        // Add like
        return await RaceExperience.findByIdAndUpdate(
          experienceId,
          { $addToSet: { likes: { userId } } },
          { new: true }
        ).populate("likes.userId", "userName email");
      }
    } catch (error) {
      throw error;
    }
  }

  static async addComment(experienceId, userId, comment) {
    try {
      const experience = await RaceExperience.findById(experienceId);
      if (!experience) {
        throw new Error("Experience not found");
      }

      return await RaceExperience.findByIdAndUpdate(
        experienceId,
        {
          $push: {
            comments: {
              userId,
              comment,
              createdAt: new Date(),
            },
          },
        },
        { new: true }
      ).populate("comments.userId", "userName email");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RaceExperienceService;
