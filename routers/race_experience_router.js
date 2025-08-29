const express = require("express");
const router = express.Router();
const controller = require("../controllers/race_experience_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Race Experiences
 *   description: Race experience sharing and management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RaceExperience:
 *       type: object
 *       properties:
 *         author:
 *           type: string
 *           description: ID of the user who created the experience
 *         membershipId:
 *           type: string
 *           description: ID of the related membership
 *         raceId:
 *           type: string
 *           description: ID of the related race
 *         title:
 *           type: string
 *           description: Title of the experience
 *         experienceText:
 *           type: string
 *           description: Detailed experience description
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs
 *         likes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               likedAt:
 *                 type: string
 *                 format: date-time
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               comment:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *       required:
 *         - author
 *         - membershipId
 *         - raceId
 *         - title
 *         - experienceText
 */

/**
 * @swagger
 * /api/v1/race_experiences:
 *   post:
 *     summary: Create a new race experience
 *     tags: [Race Experiences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RaceExperience'
 *     responses:
 *       201:
 *         description: Experience created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createExperience);

/**
 * @swagger
 * /api/v1/race_experiences:
 *   get:
 *     summary: Get all race experiences
 *     tags: [Race Experiences]
 *     responses:
 *       200:
 *         description: List of all race experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RaceExperience'
 */
router.get("/", controller.getAllExperiences);

/**
 * @swagger
 * /api/v1/race_experiences/{id}:
 *   get:
 *     summary: Get a race experience by ID
 *     tags: [Race Experiences]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RaceExperience'
 *       404:
 *         description: Experience not found
 */
router.get("/:id", controller.getExperienceById);

/**
 * @swagger
 * /api/v1/race_experiences/race/{raceId}:
 *   get:
 *     summary: Get experiences by race ID
 *     tags: [Race Experiences]
 *     parameters:
 *       - in: path
 *         name: raceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Race ID
 *     responses:
 *       200:
 *         description: List of experiences for the race
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RaceExperience'
 */
router.get("/race/:raceId", controller.getExperiencesByRace);

/**
 * @swagger
 * /api/v1/race_experiences/user/{userId}:
 *   get:
 *     summary: Get experiences by user ID
 *     tags: [Race Experiences]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of experiences by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RaceExperience'
 */
router.get("/user/:userId", controller.getExperiencesByUser);

/**
 * @swagger
 * /api/v1/race_experiences/{id}:
 *   put:
 *     summary: Update a race experience
 *     tags: [Race Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RaceExperience'
 *     responses:
 *       200:
 *         description: Experience updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Experience not found
 */
router.put("/:id", authenticateToken, controller.updateExperience);

/**
 * @swagger
 * /api/v1/race_experiences/{id}:
 *   delete:
 *     summary: Delete a race experience
 *     tags: [Race Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Experience not found
 */
router.delete("/:id", authenticateToken, controller.deleteExperience);

/**
 * @swagger
 * /api/v1/race_experiences/{id}/like:
 *   post:
 *     summary: Like a race experience
 *     tags: [Race Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID who is liking the experience
 *     responses:
 *       200:
 *         description: Experience liked successfully
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Experience not found
 */
router.post("/:id/like", authenticateToken, controller.likeExperience);

/**
 * @swagger
 * /api/v1/race_experiences/{id}/comment:
 *   post:
 *     summary: Add a comment to a race experience
 *     tags: [Race Experiences]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - comment
 *               - userId
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: Comment and User ID are required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Experience not found
 */
router.post("/:id/comment", authenticateToken, controller.addComment);

module.exports = router;