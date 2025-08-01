const CoachingCourseService = require("../services/coaching_course_service");

class CoachingCourseController {
  static async createCourse(req, res, next) {
    try {
      const courseData = req.body;
      const newCourse = await CoachingCourseService.createCourse(courseData);
      return res.status(201).json(newCourse);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCourses(req, res, next) {
    try {
      const courses = await CoachingCourseService.getAllCourses();
      return res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }

  static async getCourseById(req, res, next) {
    try {
      const courseId = req.params.id;
      const course = await CoachingCourseService.getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  }

  static async updateCourse(req, res, next) {
    try {
      const courseId = req.params.id;
      const updateData = req.body;
      const updatedCourse = await CoachingCourseService.updateCourse(courseId, updateData);
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json(updatedCourse);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCourse(req, res, next) {
    try {
      const courseId = req.params.id;
      const deletedCourse = await CoachingCourseService.deleteCourse(courseId);
      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async getCoursesByCoach(req, res, next) {
    try {
      const coachId = req.params.coachId;
      const courses = await CoachingCourseService.getCoursesByCoach(coachId);
      return res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }

  static async getUpcomingCourses(req, res, next) {
    try {
      const courses = await CoachingCourseService.getUpcomingCourses();
      return res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }

  static async getCoursesByDifficulty(req, res, next) {
    try {
      const difficulty = req.params.difficulty;
      const courses = await CoachingCourseService.getCoursesByDifficulty(difficulty);
      return res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CoachingCourseController;