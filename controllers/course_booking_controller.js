const CourseBookingService = require("../services/course_booking_service");
const CoachingCourse = require("../models/coaching_course_model");
const User = require("../models/user_model");
const { Paynow } = require("paynow");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Initialize Paynow with environment variables
const paynow = new Paynow(process.env.PAYNOW_ID, process.env.PAYNOW_KEY);
paynow.resultUrl = process.env.PAYNOW_RESULT_URL;
paynow.returnUrl = process.env.PAYNOW_RETURN_URL;

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send booking confirmation email
const sendBookingEmail = async (email, userName, courseDetails, bookingId) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: `✅ Course Registration Confirmed - ${courseDetails.title}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 40px 0; margin: 0;">
        <div style="max-width: 650px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); overflow: hidden;">
          
          <!-- Header with Logo -->
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px 20px; text-align: center; position: relative;">
            <h1 style="color: white; font-size: 28px; margin: 0; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Course Registration Confirmed!</h1>
            <p style="color: #f0f0ff; font-size: 16px; margin: 8px 0 0 0; font-weight: 300;">${
              courseDetails.title
            }</p>
          </div>
          
          <!-- Success Banner -->
          <div style="background: linear-gradient(90deg, #4f46e5, #7c3aed); padding: 2px;">
            <div style="background: #f8fafc; padding: 20px; text-align: center;">
              <div style="display: inline-block; background: #4f46e5; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 18px;">
                🎉 COURSE REGISTRATION SUCCESSFUL
              </div>
            </div>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Hello ${userName},</h2>
            
            <p style="font-size: 17px; color: #374151; line-height: 1.6; margin-bottom: 25px;">
              Congratulations! You have successfully registered for <strong style="color: #4f46e5;">${
                courseDetails.title
              }</strong>. 
              We're excited to have you join us for this coaching course!
            </p>
            
            <!-- Course Details Card -->
            <div style="background: linear-gradient(135deg, #f0f0ff 0%, #ffffff 100%); border: 2px solid #4f46e5; border-radius: 12px; padding: 25px; margin: 25px 0; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);">
              <h3 style="color: #4f46e5; font-size: 20px; margin: 0 0 15px 0; font-weight: 600;">Course Details</h3>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Title</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500;">${
                    courseDetails.title
                  }</p>
                </div>
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Date</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500;">${new Date(
                    courseDetails.date
                  ).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Duration</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500;">${
                    courseDetails.duration || "N/A"
                  }</p>
                </div>
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Price</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500;">$${
                    courseDetails.price || "0"
                  }</p>
                </div>
              </div>
              
              <div>
                <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Location</p>
                <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500;">${
                  courseDetails.location || "Online"
                }</p>
              </div>
            </div>
            
            <!-- Booking ID -->
            <div style="background: #f9fafb; border-left: 4px solid #4f46e5; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; font-weight: 600;">📋 Booking Reference</h3>
              <div style="font-size: 24px; font-weight: 900; color: #4f46e5; font-family: 'Courier New', monospace; letter-spacing: 2px; margin: 8px 0;">${bookingId}</div>
              <p style="color: #6b7280; font-size: 14px; margin: 8px 0 0 0;">Keep this reference for payment and future correspondence</p>
            </div>
            
            <!-- Payment Instructions -->
            <div style="background: #f9fafb; border-left: 4px solid #000000; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; font-weight: 600;">💰 Payment Instructions</h3>
              <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0;">
                Please use your booking reference <strong style="color: #4f46e5;">${bookingId}</strong> 
                to proceed with payment via <strong>EcoCash</strong>. You can make payment using the payment link provided in your account.
              </p>
            </div>
            
            <!-- What's Next Section -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">📋 What's Next?</h3>
              <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Complete your payment using the booking reference above</li>
                <li>Wait for payment confirmation email</li>
                <li>Prepare for the course and follow any additional instructions</li>
                <li>Join the course on the scheduled date and time</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Thank you for registering with us. We look forward to seeing you in the course!
              </p>
              
              <p style="font-size: 16px; color: #6b7280; margin: 0;">
                Best regards,<br>
                <strong style="color: #4f46e5;">The ${
                  courseDetails.title
                } Team</strong>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(90deg, #4f46e5, #7c3aed); padding: 2px;">
            <div style="background: #1f2937; padding: 20px; text-align: center;">
              <small style="color: #9ca3af; font-size: 14px;">
                © ${new Date().getFullYear()} ${
      courseDetails.title
    } • All rights reserved<br>
                <span style="color: #6b7280;">Powered by passion, driven by excellence</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Booking email sent successfully to ${email} for ${courseDetails.title}`
    );
  } catch (error) {
    console.error("Error sending email:", error);
    // Do not throw to avoid breaking the flow if email fails
  }
};

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
        return res
          .status(400)
          .json({ message: "User already booked this course" });
      }

      const newBooking = await CourseBookingService.createBooking(bookingData);

      // Get course details for email
      const course = await CoachingCourse.findById(bookingData.courseId);
      const user = await User.findById(bookingData.userId);

      // Send booking confirmation email
      await sendBookingEmail(user.email, user.userName, course, newBooking._id);

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
      const bookings = await CourseBookingService.getBookingsByPaymentStatus(
        status
      );
      return res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  }

  // New method to initiate EcoCash payment
  static async payByEcocash(req, res, next) {
    try {
      const { bookingId, phoneNumber } = req.body;

      const booking = await CourseBookingService.getBookingById(bookingId);

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      if (booking.paymentStatus === "paid") {
        return res.status(400).json({ message: "Payment already completed" });
      }

      const course = await CoachingCourse.findById(booking.courseId);
      const user = await User.findById(booking.userId);

      const invoiceNumber = `COURSE-${Date.now()}`;
      const payment = paynow.createPayment(invoiceNumber, user.email);

      payment.add(course.title, course.price);

      const response = await paynow.sendMobile(payment, phoneNumber, "ecocash");

      if (response.success) {
        await CourseBookingService.updatePaymentStatus(
          bookingId,
          "pending",
          response.pollUrl
        );

        res.json({
          success: true,
          message: "Payment initiated",
          pollUrl: response.pollUrl,
          bookingId: bookingId,
        });
      } else {
        await CourseBookingService.updatePaymentStatus(bookingId, "failed");
        res.status(500).json({ message: response.errors });
      }
    } catch (error) {
      next(error);
    }
  }

  // New method to check payment status
  static async checkPaymentStatus(req, res, next) {
    try {
      const { pollUrl, bookingId } = req.body;

      // Validate input
      if (!pollUrl || !bookingId) {
        return res.status(400).json({
          message: "pollUrl and bookingId are required",
        });
      }

      // Find booking first to ensure it exists
      const booking = await CourseBookingService.getBookingById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      // Poll transaction from Paynow
      let paynowStatus;
      try {
        paynowStatus = await paynow.pollTransaction(pollUrl);
        console.log("Paynow status response:", paynowStatus);
      } catch (pollError) {
        console.error("Error polling transaction:", pollError);

        // Update status to failed if polling fails
        await CourseBookingService.updatePaymentStatus(bookingId, "failed");

        return res.status(500).json({
          message: "Error checking payment status",
          error: pollError.message,
        });
      }

      // Update payment status in DB with the status from Paynow
      const updatedBooking = await CourseBookingService.updatePaymentStatus(
        bookingId,
        paynowStatus.status, // Use the actual status from Paynow
        pollUrl // Keep the pollUrl for future reference
      );

      if (!updatedBooking) {
        return res
          .status(404)
          .json({ message: "Failed to update booking status" });
      }

      // Status message mapping
      const statusMessages = {
        paid: "Payment successful",
        cancelled: "Payment was cancelled",
        failed: "Payment failed",
        created: "Payment created but not yet sent",
        sent: "Payment request sent to customer",
        awaiting_delivery: "Payment confirmed, awaiting delivery",
        awaiting_confirmation: "Awaiting payment confirmation",
        unpaid: "Payment not yet made",
        pending: "Payment is pending processing",
      };

      const message =
        statusMessages[paynowStatus.status?.toLowerCase()] ||
        "Payment status retrieved";

      // Return Paynow status with mapped message
      return res.json({
        status: paynowStatus.status,
        message,
        bookingId: bookingId,
        pollUrl: pollUrl,
        booking: updatedBooking, // Return the updated booking for reference
      });
    } catch (error) {
      console.error("Error in checkPaymentStatus:", error);
      next(error);
    }
  }
}

module.exports = CourseBookingController;
