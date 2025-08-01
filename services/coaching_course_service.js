const CoachingCourse = require("../models/coaching_course_model");
const User = require("../models/user_model");

class CoachingCourseService {
  // Create a new coaching course
  static async createCourse(courseData) {
    try {
      // Verify coach exists
      const coachExists = await User.findById(courseData.coach);
      if (!coachExists) {
        throw new Error("Coach not found");
      }

      const newCourse = new CoachingCourse(courseData);
      return await newCourse.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all courses
  static async getAllCourses() {
    try {
      return await CoachingCourse.find().populate("coach", "userName email");
    } catch (error) {
      throw error;
    }
  }

  // Get course by ID
  static async getCourseById(courseId) {
    try {
      return await CoachingCourse.findById(courseId).populate("coach", "userName email");
    } catch (error) {
      throw error;
    }
  }

  // Update a course
  static async updateCourse(courseId, updateData) {
    try {
      // Verify coach exists if being updated
      if (updateData.coach) {
        const coachExists = await User.findById(updateData.coach);
        if (!coachExists) {
          throw new Error("Coach not found");
        }
      }

      return await CoachingCourse.findByIdAndUpdate(
        courseId,
        updateData,
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Delete a course
  static async deleteCourse(courseId) {
    try {
      return await CoachingCourse.findByIdAndDelete(courseId);
    } catch (error) {
      throw error;
    }
  }

  // Get courses by coach
  static async getCoursesByCoach(coachId) {
    try {
      return await CoachingCourse.find({ coach: coachId });
    } catch (error) {
      throw error;
    }
  }

  // Get upcoming courses
  static async getUpcomingCourses() {
    try {
      return await CoachingCourse.find({ 
        date: { $gte: new Date() } 
      }).sort({ date: 1 });
    } catch (error) {
      throw error;
    }
  }

  // Get courses by difficulty level
  static async getCoursesByDifficulty(difficulty) {
    try {
      return await CoachingCourse.find({ difficultyLevel: difficulty });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CoachingCourseService;