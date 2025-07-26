const express = require("express");
const router = express.Router();
const trainingProgramController = require("../controllers/training_program_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Training Programs
 *   description: Training program management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainingProgram:
 *       type: object
 *       required:
 *         - title
 *         - assignedBy
 *         - athletes
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the training program
 *         description:
 *           type: string
 *           description: Detailed description of the program
 *         assignedBy:
 *           type: string
 *           description: ID of the coach/admin who created the program
 *         athletes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of athlete IDs assigned to the program
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Start date of the program
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: End date of the program
 *         status:
 *           type: string
 *           enum: [active, completed, cancelled]
 *           default: active
 *           description: Current status of the program
 *         notes:
 *           type: string
 *           description: Additional notes about the program
 *       example:
 *         title: "Summer Training Program"
 *         description: "Intensive summer training for competitive athletes"
 *         assignedBy: "60d21b4667d0d8992e610c85"
 *         athletes: ["60d21b4667d0d8992e610c86", "60d21b4667d0d8992e610c87"]
 *         startDate: "2023-06-01T00:00:00Z"
 *         endDate: "2023-08-31T00:00:00Z"
 *         status: "active"
 *         notes: "Focus on endurance and strength training"
 */

/**
 * @swagger
 * /api/v1/training_programs:
 *   post:
 *     summary: Create a new training program (coach/admin only)
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingProgram'
 *     responses:
 *       201:
 *         description: Training program created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgram'
 *       400:
 *         description: Bad request (invalid data or athlete/coach validation failed)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (user doesn't have coach/admin role)
 *       500:
 *         description: Server error
 */
router.post("/", authenticateToken, trainingProgramController.createProgram);

/**
 * @swagger
 * /api/v1/training_programs:
 *   get:
 *     summary: Get all training programs
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, completed, cancelled]
 *         description: Filter programs by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of programs returned
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of all training programs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgram'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
router.get("/", authenticateToken, trainingProgramController.getAllPrograms);

/**
 * @swagger
 * /api/v1/training_programs/{id}:
 *   get:
 *     summary: Get a specific training program by ID
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Training program ID
 *     responses:
 *       200:
 *         description: Training program data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgram'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Training program not found
 *       500:
 *         description: Server error
 */
router.get("/:id", authenticateToken, trainingProgramController.getProgramById);

/**
 * @swagger
 * /api/v1/training_programs/{id}:
 *   put:
 *     summary: Update a training program (coach/admin only)
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Training program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingProgram'
 *     responses:
 *       200:
 *         description: Training program updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgram'
 *       400:
 *         description: Bad request (invalid data or athlete/coach validation failed)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (user doesn't have coach/admin role)
 *       404:
 *         description: Training program not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authenticateToken, trainingProgramController.updateProgram);

/**
 * @swagger
 * /api/v1/training_programs/{id}:
 *   delete:
 *     summary: Delete a training program (coach/admin only)
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Training program ID
 *     responses:
 *       200:
 *         description: Training program deleted successfully
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (user doesn't have coach/admin role)
 *       404:
 *         description: Training program not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  authenticateToken,
  trainingProgramController.deleteProgram
);

/**
 * @swagger
 * /api/v1/training_programs/athlete/{athleteId}:
 *   get:
 *     summary: Get programs for a specific athlete
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: athleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Athlete user ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, completed, cancelled]
 *         description: Filter programs by status
 *     responses:
 *       200:
 *         description: List of training programs assigned to the athlete
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgram'
 *       400:
 *         description: Bad request (invalid athlete ID)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
router.get(
  "/athlete/:athleteId",
  authenticateToken,
  trainingProgramController.getAthletePrograms
);

/**
 * @swagger
 * /api/v1/training_programs/creator/{creatorId}:
 *   get:
 *     summary: Get programs created by a specific coach/admin
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         schema:
 *           type: string
 *         required: true
 *         description: Coach/admin user ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, completed, cancelled]
 *         description: Filter programs by status
 *     responses:
 *       200:
 *         description: List of training programs created by the coach/admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgram'
 *       400:
 *         description: Bad request (invalid creator ID)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
router.get(
  "/creator/:creatorId",
  authenticateToken,
  trainingProgramController.getCreatorPrograms
);

/**
 * @swagger
 * /api/v1/training_programs/{id}/status:
 *   patch:
 *     summary: Update program status (coach/admin only)
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Training program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, completed, cancelled]
 *                 description: New status for the program
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Program status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgram'
 *       400:
 *         description: Bad request (invalid status value)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (user doesn't have coach/admin role)
 *       404:
 *         description: Training program not found
 *       500:
 *         description: Server error
 */
router.patch(
  "/:id/status",
  authenticateToken,
  trainingProgramController.updateStatus
);

/**
 * @swagger
 * /api/v1/training_programs/{programId}/athletes:
 *   post:
 *     summary: Add athlete to program (coach/admin only)
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         schema:
 *           type: string
 *         required: true
 *         description: Training program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               athleteId:
 *                 type: string
 *                 description: ID of the athlete to add
 *             required:
 *               - athleteId
 *     responses:
 *       200:
 *         description: Athlete added to program successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgram'
 *       400:
 *         description: Bad request (invalid athlete ID or already in program)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (user doesn't have coach/admin role)
 *       404:
 *         description: Training program not found
 *       500:
 *         description: Server error
 */
router.post(
  "/:programId/athletes",
  authenticateToken,
  trainingProgramController.addAthlete
);

/**
 * @swagger
 * /api/v1/training_programs/{programId}/athletes/{athleteId}:
 *   delete:
 *     summary: Remove athlete from program (coach/admin only)
 *     tags: [Training Programs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: programId
 *         schema:
 *           type: string
 *         required: true
 *         description: Training program ID
 *       - in: path
 *         name: athleteId
 *         schema:
 *           type: string
 *         required: true
 *         description: Athlete user ID to remove
 *     responses:
 *       200:
 *         description: Athlete removed from program successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgram'
 *       400:
 *         description: Bad request (athlete not in program)
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (user doesn't have coach/admin role)
 *       404:
 *         description: Training program not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:programId/athletes/:athleteId",
  authenticateToken,
  trainingProgramController.removeAthlete
);

module.exports = router;
