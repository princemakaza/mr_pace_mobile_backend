const express = require("express");
const router = express.Router();
const raceController = require("../controllers/race_controller");

/**
 * @swagger
 * /api/v1/races/:
 *   post:
 *     summary: Create a new race
 *     tags: [Races]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *           example:
 *             name: "Marathon 2024"
 *             description: "Annual city marathon race"
 *             Image: "https://example.com/race-image.jpg"
 *             registrationPrice: "$50"
 *             venue: "Central Park, NYC"
 *             RegistrationStatus: "Open"
 *             date: "2024-06-15"
 *             raceEvents:
 *               - distanceRace: "5K"
 *                 reachLimit: "100 participants"
 *               - distanceRace: "10K"
 *                 reachLimit: "200 participants"
 *     responses:
 *       201:
 *         description: Race created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       400:
 *         description: Bad request (missing required fields or invalid data)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", raceController.createRace);
/**
 * @swagger
 * /api/v1/races:
 *   get:
 *     summary: Get all races
 *     tags: [Races]
 *     responses:
 *       200:
 *         description: List of all races
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Race'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", raceController.getAllRaces);
/**
 * @swagger
 * /api/v1/races/status/{status}:
 *   get:
 *     summary: Get races by registration status
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Open, Closed, Postponed]
 *         description: Race registration status
 *         example: Open
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, date, registrationPrice]
 *           default: date
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: List of races with specified status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Race'
 *       400:
 *         description: Invalid status value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/status/:status", raceController.getRacesByStatus);

/**
 * @swagger
 * /api/v1/races/{id}:
 *   get:
 *     summary: Get a race by ID
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: MongoDB ObjectId of the race
 *         example: 60d5ecb54b24a56f8c8d9e6a
 *     responses:
 *       200:
 *         description: Race details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         description: Race not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", raceController.getRaceById);

/**
 * @swagger
 * /api/v1/races/{id}:
 *   put:
 *     summary: Update a race
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: MongoDB ObjectId of the race
 *         example: 60d5ecb54b24a56f8c8d9e6a
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Race'
 *           example:
 *             name: "Updated Marathon 2024"
 *             description: "Updated annual city marathon race"
 *             registrationPrice: "$60"
 *             RegistrationStatus: "Closed"
 *             raceEvents:
 *               - distanceRace: "Half Marathon"
 *                 reachLimit: "150 participants"
 *     responses:
 *       200:
 *         description: Race updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Race'
 *       404:
 *         description: Race not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad request (invalid data or ID format)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", raceController.updateRace);

/**
 * @swagger
 * /api/v1/races/{id}:
 *   delete:
 *     summary: Delete a race
 *     tags: [Races]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: MongoDB ObjectId of the race
 *         example: 60d5ecb54b24a56f8c8d9e6a
 *     responses:
 *       204:
 *         description: Race deleted successfully
 *       404:
 *         description: Race not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Invalid ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", raceController.deleteRace);

module.exports = router;
