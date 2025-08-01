const CourseBookingService = require("../services/course_booking_service");

class CourseBookingController {
  static async createBooking(req, res, next) {
    try {
      const bookingData = req.body;
      
      // Check if booking already exists
      const existingBooking = await CourseBookingService.checkExistingBooking(
        bookingData.userId,
        bookingData.courseId
      );
      
      if (existingBooking) {
        return res.status(400).json({ message: "User already booked this course" });
      }

      const newBooking = await CourseBookingService.createBooking(bookingData);
      return res.status(201).json(newBooking);
    } catch (error) {
      next(error);
    }
  }

  static async getAllBookings(req, res, next) {
    try {
      const bookings = await CourseBookingService.getAllBookings();
      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  static async getBookingById(req, res, next) {
    try {
      const bookingId = req.params.id;
      const booking = await CourseBookingService.getBookingById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }

  static async updatePaymentStatus(req, res, next) {
    try {
      const bookingId = req.params.id;
      const { status, pollUrl } = req.body;
      const updatedBooking = await CourseBookingService.updatePaymentStatus(
        bookingId, 
        status, 
        pollUrl
      );
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.status(200).json(updatedBooking);
    } catch (error) {
      next(error);
    }
  }

  static async updateAttendanceStatus(req, res, next) {
    try {
      const bookingId = req.params.id;
      const { status } = req.body;
      const updatedBooking = await CourseBookingService.updateAttendanceStatus(
        bookingId, 
        status
      );
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res.status(200).json(updatedBooking);
    } catch (error) {
      next(error);
    }
  }

  static async getBookingsByUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const bookings = await CourseBookingService.getBookingsByUser(userId);
      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  static async getBookingsByCourse(req, res, next) {
    try {
      const courseId = req.params.courseId;
      const bookings = await CourseBookingService.getBookingsByCourse(courseId);
      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  static async getBookingsByPaymentStatus(req, res, next) {
    try {
      const status = req.params.status;
      const bookings = await CourseBookingService.getBookingsByPaymentStatus(status);
      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CourseBookingController;