const express = require("express");
const router = express.Router();
const controller = require("../controllers/injury_exercise_solution_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Injury Exercise Solutions
 *   description: Exercise and nutrition solutions for sports injuries
 */

/**
 * @swagger
 * /api/v1/injury_solutions:
 *   post:
 *     summary: Create a new injury exercise solution
 *     tags: [Injury Exercise Solutions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InjuryExerciseSolution'
 *     responses:
 *       201:
 *         description: Injury solution created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createSolution);

/**
 * @swagger
 * /api/v1/injury_solutions:
 *   get:
 *     summary: Get all injury exercise solutions
 *     tags: [Injury Exercise Solutions]
 *     responses:
 *       200:
 *         description: List of all injury solutions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjuryExerciseSolution'
 */
router.get("/", controller.getAllSolutions);

/**
 * @swagger
 * /api/v1/injury_solutions/{id}:
 *   get:
 *     summary: Get an injury solution by ID
 *     tags: [Injury Exercise Solutions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The injury solution ID
 *     responses:
 *       200:
 *         description: Injury solution data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InjuryExerciseSolution'
 *       404:
 *         description: Solution not found
 */
router.get("/:id", controller.getSolutionById);

/**
 * @swagger
 * /api/v1/injury_solutions/{id}:
 *   put:
 *     summary: Update an injury solution
 *     tags: [Injury Exercise Solutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The injury solution ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InjuryExerciseSolution'
 *     responses:
 *       200:
 *         description: Updated injury solution
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InjuryExerciseSolution'
 *       404:
 *         description: Solution not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticateToken, controller.updateSolution);

/**
 * @swagger
 * /api/v1/injury_solutions/{id}:
 *   delete:
 *     summary: Delete an injury solution
 *     tags: [Injury Exercise Solutions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The injury solution ID
 *     responses:
 *       200:
 *         description: Solution deleted successfully
 *       404:
 *         description: Solution not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticateToken, controller.deleteSolution);

/**
 * @swagger
 * /api/v1/injury_solutions/injury/{injuryType}:
 *   get:
 *     summary: Get solutions by injury type
 *     tags: [Injury Exercise Solutions]
 *     parameters:
 *       - in: path
 *         name: injuryType
 *         schema:
 *           type: string
 *         required: true
 *         description: Type of injury (case insensitive search)
 *     responses:
 *       200:
 *         description: List of solutions for the injury type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjuryExerciseSolution'
 */
router.get("/injury/:injuryType", controller.getSolutionsByInjuryType);

/**
 * @swagger
 * /api/v1/injury_solutions/difficulty/{difficulty}:
 *   get:
 *     summary: Get solutions by difficulty level
 *     tags: [Injury Exercise Solutions]
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [Beginner, Intermediate, Advanced]
 *         required: true
 *         description: Difficulty level of exercises
 *     responses:
 *       200:
 *         description: List of solutions by difficulty level
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjuryExerciseSolution'
 */
router.get("/difficulty/:difficulty", controller.getSolutionsByDifficulty);

/**
 * @swagger
 * /api/v1/injury_solutions/coach/{coachId}:
 *   get:
 *     summary: Get solutions by coach
 *     tags: [Injury Exercise Solutions]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: string
 *         required: true
 *         description: The coach's user ID
 *     responses:
 *       200:
 *         description: List of solutions created by the coach
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjuryExerciseSolution'
 */
router.get("/coach/:coachId", controller.getSolutionsByCoach);

module.exports = router;