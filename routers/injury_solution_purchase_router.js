const express = require("express");
const router = express.Router();
const controller = require("../controllers/injury_solution_purchase_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Injury Solution Purchases
 *   description: Injury solution purchase management
 */

/**
 * @swagger
 * /api/v1/injury_solution_purchases:
 *   post:
 *     summary: Create a new injury solution purchase
 *     tags: [Injury Solution Purchases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InjurySolutionPurchase'
 *     responses:
 *       201:
 *         description: Injury solution purchase created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createPurchase);

/**
 * @swagger
 * /api/v1/injury_solution_purchases:
 *   get:
 *     summary: Get all injury solution purchases
 *     tags: [Injury Solution Purchases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all injury solution purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjurySolutionPurchase'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, controller.getAllPurchases);

/**
 * @swagger
 * /api/v1/injury_solution_purchases/{id}:
 *   get:
 *     summary: Get an injury solution purchase by ID
 *     tags: [Injury Solution Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The purchase ID
 *     responses:
 *       200:
 *         description: Injury solution purchase data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InjurySolutionPurchase'
 *       404:
 *         description: Purchase not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticateToken, controller.getPurchaseById);

/**
 * @swagger
 * /api/v1/injury_solution_purchases/{id}/status:
 *   patch:
 *     summary: Update payment status of a purchase
 *     tags: [Injury Solution Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The purchase ID
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
 *               $ref: '#/components/schemas/InjurySolutionPurchase'
 *       404:
 *         description: Purchase not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/status", authenticateToken, controller.updatePaymentStatus);

/**
 * @swagger
 * /api/v1/injury_solution_purchases/user/{userId}:
 *   get:
 *     summary: Get purchases by user ID
 *     tags: [Injury Solution Purchases]
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
 *         description: List of purchases by user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjurySolutionPurchase'
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", authenticateToken, controller.getPurchasesByUser);

/**
 * @swagger
 * /api/v1/injury_solution_purchases/solution/{solutionId}:
 *   get:
 *     summary: Get purchases by injury solution ID
 *     tags: [Injury Solution Purchases]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: solutionId
 *         schema:
 *           type: string
 *         required: true
 *         description: The injury solution ID
 *     responses:
 *       200:
 *         description: List of purchases for the solution
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjurySolutionPurchase'
 *       401:
 *         description: Unauthorized
 */
router.get("/solution/:solutionId", authenticateToken, controller.getPurchasesBySolution);

/**
 * @swagger
 * /api/v1/injury_solution_purchases/status/{status}:
 *   get:
 *     summary: Get purchases by payment status
 *     tags: [Injury Solution Purchases]
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
 *         description: List of purchases by status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InjurySolutionPurchase'
 *       401:
 *         description: Unauthorized
 */
router.get("/status/:status", authenticateToken, controller.getPurchasesByStatus);

module.exports = router;