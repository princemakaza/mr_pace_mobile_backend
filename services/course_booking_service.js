const CourseBooking = require("../models/course_booking_model");
const CoachingCourse = require("../models/coaching_course_model");
const User = require("../models/user_model");

class CourseBookingService {
  // Create a new booking
  static async createBooking(bookingData) {
    try {
      // Verify course exists
      const courseExists = await CoachingCourse.findById(bookingData.courseId);
      if (!courseExists) {
        throw new Error("Course not found");
      }

      // Verify user exists
      const userExists = await User.findById(bookingData.userId);
      if (!userExists) {
        throw new Error("User not found");
      }

      const newBooking = new CourseBooking(bookingData);
      return await newBooking.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all bookings
  static async getAllBookings() {
    try {
      return await CourseBooking.find()
        .populate("userId")
        .populate("courseId");
    } catch (error) {
      throw error;
    }
  }

  // Get booking by ID
  static async getBookingById(bookingId) {
    try {
      return await CourseBooking.findById(bookingId)
        .populate("userId", "userName email")
        .populate("courseId");
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  static async updatePaymentStatus(bookingId, newStatus, pollUrl = null) {
    try {
      // Validate the status against our enum
      const validStatuses = [
        "paid",
        "pending",
        "failed",
        "unpaid",
        "cancelled",
        "sent",
        "awaiting_delivery",
        "awaiting_confirmation",
      ];

      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Invalid payment status: ${newStatus}`);
      }

      const updateData = {
        paymentStatus: newStatus,
        updatedAt: new Date(), // Add update timestamp if your schema has it
      };

      if (pollUrl) {
        updateData.pollUrl = pollUrl;
      }

      // Use findByIdAndUpdate with proper options
      return await CourseBooking.findByIdAndUpdate(bookingId, updateData)
        .populate("userId", "userName email")
        .populate("courseId", "title price");
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  }

  // Update attendance status
  static async updateAttendanceStatus(bookingId, status) {
    try {
      return await CourseBooking.findByIdAndUpdate(
        bookingId,
        { attendanceStatus: status },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  // Get bookings by user
  static async getBookingsByUser(userId) {
    try {
      return await CourseBooking.find({ userId }).populate(
        "courseId"
      );
    } catch (error) {
      throw error;
    }
  }

  // Get bookings by course
  static async getBookingsByCourse(courseId) {
    try {
      return await CourseBooking.find({ courseId }).populate(
        "userId",
        "userName email"
      );
    } catch (error) {
      throw error;
    }
  }

  // Get bookings by payment status
  static async getBookingsByPaymentStatus(status) {
    try {
      return await CourseBooking.find({ paymentStatus: status })
        .populate("userId", "userName email")
        .populate("courseId", "title");
    } catch (error) {
      throw error;
    }
  }

  // Check if user is already booked for a course
  static async checkExistingBooking(userId, courseId) {
    try {
      return await CourseBooking.findOne({ userId, courseId });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CourseBookingService;
