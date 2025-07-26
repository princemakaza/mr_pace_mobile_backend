const express = require("express");
const router = express.Router();
const controller = require("../controllers/event_booking_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Event Bookings
 *   description: Event booking management
 */

/**
 * @swagger
 * /api/v1/event_booking_route:
 *   post:
 *     summary: Create a new event booking
 *     tags: [Event Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventBooking'
 *     responses:
 *       201:
 *         description: Event booking created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createBooking);

/**
 * @swagger
 * /api/v1/event_booking_route:
 *   get:
 *     summary: Get all event bookings
 *     tags: [Event Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of bookings returned
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of all event bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventBooking'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, controller.getAllBookings);

/**
 * @swagger
 * /api/v1/event_booking_route/status/{status}:
 *   get:
 *     summary: Get bookings by status
 *     tags: [Event Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pending, Accepted, Rejected, Cancelled]
 *         required: true
 *         description: Booking status to filter by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of bookings returned
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of filtered event bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventBooking'
 *       400:
 *         description: Invalid status parameter
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/status/:status",
  authenticateToken,
  controller.getBookingsByStatus
);

/**
 * @swagger
 * /api/v1/event_booking_route/search:
 *   get:
 *     summary: Search event bookings
 *     tags: [Event Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query (searches eventName, organizerName, organizerEmail)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of bookings returned
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of matching event bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventBooking'
 *       400:
 *         description: Invalid search parameters
 *       401:
 *         description: Unauthorized
 */
router.get("/search", authenticateToken, controller.searchBookings);

/**
 * @swagger
 * /api/v1/event_booking_route/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Event Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventBooking'
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticateToken, controller.getBookingById);

/**
 * @swagger
 * /api/v1/event_booking_route/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Event Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventBooking'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.put("/:id", authenticateToken, controller.updateBooking);

/**
 * @swagger
 * /api/v1/event_booking_route/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Event Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
router.delete("/:id", authenticateToken, controller.deleteBooking);

module.exports = router;
