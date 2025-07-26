const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile_controller");
const { authenticateToken } = require('./../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: User profile management
 */

/**
 * @swagger
 * /api/v1/profile_route:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, profileController.createProfile);

/**
 * @swagger
 * /api/v1/profile_route:
 *   get:
 *     summary: Get all profiles
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, profileController.getAllProfiles);

/**
 * @swagger
 * /api/v1/profile_route/{id}:
 *   get:
 *     summary: Get a profile by ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticateToken, profileController.getProfileById);

/**
 * @swagger
 * /api/v1/profile_route/user/{userId}:
 *   get:
 *     summary: Get a profile by user ID
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", authenticateToken, profileController.getProfileByUserId);

/**
 * @swagger
 * /api/v1/profile_route/{id}:
 *   put:
 *     summary: Update a profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.put("/:id", authenticateToken, profileController.updateProfile);

/**
 * @swagger
 * /api/v1/profile_route/{id}:
 *   delete:
 *     summary: Delete a profile
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Profile not found
 */
router.delete("/:id", authenticateToken, profileController.deleteProfile);

/**
 * @swagger
 * /api/v1/profile_route/exists/{userId}:
 *   get:
 *     summary: Check if profile exists for a user
 *     tags: [Profiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Profile exists status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 */
router.get("/exists/:userId", authenticateToken, profileController.profileExists);

module.exports = router;