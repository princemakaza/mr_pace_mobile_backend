const express = require("express");
const router = express.Router();
const controller = require("../controllers/course_booking_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Course Bookings
 *   description: Operations for booking coaching courses
 */

/**
 * @swagger
 * /api/v1/course_bookings:
 *   post:
 *     summary: Create a new course booking
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseBooking'
 *     responses:
 *       201:
 *         description: Course booking created successfully
 *       400:
 *         description: Bad request or user already booked
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createBooking);

/**
 * @swagger
 * /api/v1/course_bookings:
 *   get:
 *     summary: Get all course bookings
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all course bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseBooking'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, controller.getAllBookings);

/**
 * @swagger
 * /api/v1/course_bookings/{id}:
 *   get:
 *     summary: Get a course booking by ID
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: Course booking data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseBooking'
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticateToken, controller.getBookingById);

/**
 * @swagger
 * /api/v1/course_bookings/{id}/payment:
 *   patch:
 *     summary: Update payment status of a booking
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, failed]
 *                 example: completed
 *               pollUrl:
 *                 type: string
 *                 example: https://paymentprovider.com/poll/123
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Payment status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseBooking'
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/payment", authenticateToken, controller.updatePaymentStatus);

/**
 * @swagger
 * /api/v1/course_bookings/{id}/attendance:
 *   patch:
 *     summary: Update attendance status of a booking
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [not attended, attended, cancelled]
 *                 example: attended
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Attendance status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseBooking'
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/attendance", authenticateToken, controller.updateAttendanceStatus);

/**
 * @swagger
 * /api/v1/course_bookings/user/{userId}:
 *   get:
 *     summary: Get bookings by user ID
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of bookings by user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseBooking'
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", authenticateToken, controller.getBookingsByUser);

/**
 * @swagger
 * /api/v1/course_bookings/course/{courseId}:
 *   get:
 *     summary: Get bookings by course ID
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: List of bookings for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseBooking'
 *       401:
 *         description: Unauthorized
 */
router.get("/course/:courseId", authenticateToken, controller.getBookingsByCourse);

/**
 * @swagger
 * /api/v1/course_bookings/status/{status}:
 *   get:
 *     summary: Get bookings by payment status
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, completed, failed]
 *         required: true
 *         description: The payment status
 *     responses:
 *       200:
 *         description: List of bookings by payment status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseBooking'
 *       401:
 *         description: Unauthorized
 */
router.get("/status/:status", authenticateToken, controller.getBookingsByPaymentStatus);

/**
 * @swagger
 * /api/v1/course_bookings/payment/ecocash:
 *   post:
 *     summary: Initiate EcoCash payment for a course booking
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
 *                 description: The booking ID to pay for
 *                 example: 60d21b4667d0d8992e610c85
 *               phoneNumber:
 *                 type: string
 *                 description: EcoCash phone number
 *                 example: 0771234567
 *             required:
 *               - bookingId
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Payment initiated
 *                 pollUrl:
 *                   type: string
 *                   example: https://www.paynow.co.zw/Interface/CheckPayment/?guid=12345678-1234-1234-1234-123456789012
 *                 bookingId:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c85
 *       400:
 *         description: Payment already completed or invalid request
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Payment initiation failed
 */
router.post("/payment/ecocash", authenticateToken, controller.payByEcocash);

/**
 * @swagger
 * /api/v1/course_bookings/payment/status:
 *   post:
 *     summary: Check payment status for a booking
 *     tags: [Course Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pollUrl:
 *                 type: string
 *                 description: The poll URL from payment initiation
 *                 example: https://www.paynow.co.zw/Interface/CheckPayment/?guid=12345678-1234-1234-1234-123456789012
 *               bookingId:
 *                 type: string
 *                 description: The booking ID to check status for
 *                 example: 60d21b4667d0d8992e610c85
 *             required:
 *               - pollUrl
 *               - bookingId
 *     responses:
 *       200:
 *         description: Payment status retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Payment status from Paynow
 *                   example: paid
 *                 message:
 *                   type: string
 *                   description: Human-readable status message
 *                   example: Payment successful
 *                 bookingId:
 *                   type: string
 *                   example: 60d21b4667d0d8992e610c85
 *                 pollUrl:
 *                   type: string
 *                   example: https://www.paynow.co.zw/Interface/CheckPayment/?guid=12345678-1234-1234-1234-123456789012
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error checking payment status
 */
router.post("/payment/status", authenticateToken, controller.checkPaymentStatus);

module.exports = router;