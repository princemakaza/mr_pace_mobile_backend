const express = require("express");
const router = express.Router();
const controller = require("../controllers/training_program_package_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Training Program Packages
 *   description: Training program package management
 */

/**
 * @swagger
 * /api/v1/training_program_packages:
 *   post:
 *     summary: Create a new training program package
 *     tags: [Training Program Packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingProgramPackage'
 *     responses:
 *       201:
 *         description: Training program package created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createPackage);

/**
 * @swagger
 * /api/v1/training_program_packages:
 *   get:
 *     summary: Get all training program packages
 *     tags: [Training Program Packages]
 *     responses:
 *       200:
 *         description: List of all training program packages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgramPackage'
 */
router.get("/", controller.getAllPackages);

/**
 * @swagger
 * /api/v1/training_program_packages/{id}:
 *   get:
 *     summary: Get a training program package by ID
 *     tags: [Training Program Packages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The training program package ID
 *     responses:
 *       200:
 *         description: Training program package data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgramPackage'
 *       404:
 *         description: Package not found
 */
router.get("/:id", controller.getPackageById);

/**
 * @swagger
 * /api/v1/training_program_packages/{id}:
 *   put:
 *     summary: Update a training program package
 *     tags: [Training Program Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The training program package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingProgramPackage'
 *     responses:
 *       200:
 *         description: Updated training program package
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgramPackage'
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticateToken, controller.updatePackage);

/**
 * @swagger
 * /api/v1/training_program_packages/{id}:
 *   delete:
 *     summary: Delete a training program package
 *     tags: [Training Program Packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The training program package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *       404:
 *         description: Package not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticateToken, controller.deletePackage);

/**
 * @swagger
 * /api/v1/training_program_packages/coach/{coachId}:
 *   get:
 *     summary: Get training program packages by coach
 *     tags: [Training Program Packages]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: string
 *         required: true
 *         description: The coach's user ID
 *     responses:
 *       200:
 *         description: List of training program packages by coach
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgramPackage'
 */
router.get("/coach/:coachId", controller.getPackagesByCoach);

/**
 * @swagger
 * /api/v1/training_program_packages/difficulty/{difficulty}:
 *   get:
 *     summary: Get training program packages by difficulty level
 *     tags: [Training Program Packages]
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [Beginner, Intermediate, Advanced, Elite]
 *         required: true
 *         description: The difficulty level
 *     responses:
 *       200:
 *         description: List of training program packages by difficulty
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgramPackage'
 */
router.get("/difficulty/:difficulty", controller.getPackagesByDifficulty);

module.exports = router;