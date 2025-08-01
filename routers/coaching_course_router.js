const express = require("express");
const router = express.Router();
const controller = require("../controllers/coaching_course_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Coaching Courses
 *   description: Live coaching courses and workshops
 */

/**
 * @swagger
 * /api/v1/coaching_courses:
 *   post:
 *     summary: Create a new coaching course
 *     tags: [Coaching Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoachingCourse'
 *     responses:
 *       201:
 *         description: Coaching course created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createCourse);

/**
 * @swagger
 * /api/v1/coaching_courses:
 *   get:
 *     summary: Get all coaching courses
 *     tags: [Coaching Courses]
 *     responses:
 *       200:
 *         description: List of all coaching courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoachingCourse'
 */
router.get("/", controller.getAllCourses);

/**
 * @swagger
 * /api/v1/coaching_courses/upcoming:
 *   get:
 *     summary: Get upcoming coaching courses
 *     tags: [Coaching Courses]
 *     responses:
 *       200:
 *         description: List of upcoming coaching courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoachingCourse'
 */
router.get("/upcoming", controller.getUpcomingCourses);

/**
 * @swagger
 * /api/v1/coaching_courses/{id}:
 *   get:
 *     summary: Get a coaching course by ID
 *     tags: [Coaching Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Coaching course data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoachingCourse'
 *       404:
 *         description: Course not found
 */
router.get("/:id", controller.getCourseById);

/**
 * @swagger
 * /api/v1/coaching_courses/{id}:
 *   put:
 *     summary: Update a coaching course
 *     tags: [Coaching Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoachingCourse'
 *     responses:
 *       200:
 *         description: Updated coaching course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoachingCourse'
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticateToken, controller.updateCourse);

/**
 * @swagger
 * /api/v1/coaching_courses/{id}:
 *   delete:
 *     summary: Delete a coaching course
 *     tags: [Coaching Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticateToken, controller.deleteCourse);

/**
 * @swagger
 * /api/v1/coaching_courses/coach/{coachId}:
 *   get:
 *     summary: Get courses by coach ID
 *     tags: [Coaching Courses]
 *     parameters:
 *       - in: path
 *         name: coachId
 *         schema:
 *           type: string
 *         required: true
 *         description: The coach's user ID
 *     responses:
 *       200:
 *         description: List of courses by coach
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoachingCourse'
 */
router.get("/coach/:coachId", controller.getCoursesByCoach);

/**
 * @swagger
 * /api/v1/coaching_courses/difficulty/{difficulty}:
 *   get:
 *     summary: Get courses by difficulty level
 *     tags: [Coaching Courses]
 *     parameters:
 *       - in: path
 *         name: difficulty
 *         schema:
 *           type: string
 *           enum: [Beginner, Intermediate, Advanced]
 *         required: true
 *         description: The difficulty level
 *     responses:
 *       200:
 *         description: List of courses by difficulty
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoachingCourse'
 */
router.get("/difficulty/:difficulty", controller.getCoursesByDifficulty);

module.exports = router;