const express = require("express");
const router = express.Router();
const controller = require("../controllers/training_package_bought_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Training Packages Bought
 *   description: Training packages purchase management
 */

/**
 * @swagger
 * /api/v1/training_packages_bought:
 *   post:
 *     summary: Create a new training package purchase
 *     tags: [Training Packages Bought]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainingPackageBought'
 *     responses:
 *       201:
 *         description: Training package purchase created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createPurchase);

/**
 * @swagger
 * /api/v1/training_packages_bought:
 *   get:
 *     summary: Get all training package purchases
 *     tags: [Training Packages Bought]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all training package purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingPackageBought'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateToken, controller.getAllPurchases);

/**
 * @swagger
 * /api/v1/training_packages_bought/{id}:
 *   get:
 *     summary: Get a training package purchase by ID
 *     tags: [Training Packages Bought]
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
 *         description: Training package purchase data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPackageBought'
 *       404:
 *         description: Purchase not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authenticateToken, controller.getPurchaseById);

/**
 * @swagger
 * /api/v1/training_packages_bought/{id}/status:
 *   patch:
 *     summary: Update payment status of a purchase
 *     tags: [Training Packages Bought]
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
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Payment status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingPackageBought'
 *       404:
 *         description: Purchase not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/status", authenticateToken, controller.updatePaymentStatus);

/**
 * @swagger
 * /api/v1/training_packages_bought/user/{userId}:
 *   get:
 *     summary: Get purchases by user ID
 *     tags: [Training Packages Bought]
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
 *                 $ref: '#/components/schemas/TrainingPackageBought'
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:userId", authenticateToken, controller.getPurchasesByUser);

/**
 * @swagger
 * /api/v1/training_packages_bought/package/{packageId}:
 *   get:
 *     summary: Get purchases by training package ID
 *     tags: [Training Packages Bought]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: packageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The training package ID
 *     responses:
 *       200:
 *         description: List of purchases for the package
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingPackageBought'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/package/:packageId",
  authenticateToken,
  controller.getPurchasesByPackage
);

/**
 * @swagger
 * /api/v1/training_packages_bought/pay/ecocash:
 *   post:
 *     summary: Initiate EcoCash payment for a training package
 *     tags: [Training Packages Bought]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               purchaseId:
 *                 type: string
 *                 description: The purchase ID to pay for
 *               phoneNumber:
 *                 type: string
 *                 description: EcoCash phone number
 *             required:
 *               - purchaseId
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: Payment initiated successfully
 *       404:
 *         description: Purchase not found
 *       400:
 *         description: Payment already completed
 *       401:
 *         description: Unauthorized
 */
router.post("/pay/ecocash", authenticateToken, controller.payByEcocash);

/**
 * @swagger
 * /api/v1/training_packages_bought/check-payment:
 *   post:
 *     summary: Check payment status for a training package
 *     tags: [Training Packages Bought]
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
 *                 description: The poll URL from Paynow
 *               id:
 *                 type: string
 *                 description: The purchase ID
 *             required:
 *               - pollUrl
 *               - id
 *     responses:
 *       200:
 *         description: Payment status retrieved
 *       404:
 *         description: Purchase not found
 *       401:
 *         description: Unauthorized
 */
router.post("/check-payment", authenticateToken, controller.checkPaymentStatus);

module.exports = router;
