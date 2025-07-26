const express = require("express");
const router = express.Router();
const controller = require("../controllers/membership_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Memberships
 *   description: Membership management
 */

/**
 * @swagger
 * /api/v1/membership_route:
 *   post:
 *     summary: Create a new membership
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membership'
 *     responses:
 *       201:
 *         description: Membership created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createMembership);

/**
 * @swagger
 * /api/v1/membership_route:
 *   get:
 *     summary: Get all memberships
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all memberships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Membership'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, controller.getAllMemberships);

/**
 * @swagger
 * /api/v1/membership_route/{id}:
 *   get:
 *     summary: Get membership by ID
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Membership ID
 *     responses:
 *       200:
 *         description: Membership data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Membership not found
 */
router.get("/:id", authenticateToken, controller.getMembershipById);

/**
 * @swagger
 * /api/v1/membership_route/user/{userId}:
 *   get:
 *     summary: Get membership by user ID
 *     tags: [Memberships]
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
 *         description: Membership data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Membership'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Membership not found
 */
router.get("/user/:userId", authenticateToken, controller.getMembershipByUserId);

/**
 * @swagger
 * /api/v1/membership_route/{id}:
 *   put:
 *     summary: Update membership by ID
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Membership ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Membership'
 *     responses:
 *       200:
 *         description: Membership updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Membership not found
 */
router.put("/:id", authenticateToken, controller.updateMembership);

/**
 * @swagger
 * /api/v1/membership_route/{id}:
 *   delete:
 *     summary: Delete membership by ID
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Membership ID
 *     responses:
 *       200:
 *         description: Membership deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Membership not found
 */
router.delete("/:id", authenticateToken, controller.deleteMembership);

/**
 * @swagger
 * /api/v1/membership_route/{id}/approve:
 *   patch:
 *     summary: Approve membership
 *     tags: [Memberships]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Membership ID
 *     responses:
 *       200:
 *         description: Membership approved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Membership not found
 */
router.patch("/:id/approve", authenticateToken, controller.approveMembership);

/**
 * @swagger
 * /api/v1/membership_route/{userId}/certificate:
 *   get:
 *     summary: Generate membership certificate PDF
 *     tags: [Memberships]
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
 *         description: PDF certificate generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pdf:
 *                   type: string
 *                   description: Base64 encoded PDF
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Membership not found
 */
router.get("/:userId/certificate", authenticateToken, controller.generateMembershipCertificate);

module.exports = router;