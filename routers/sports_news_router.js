const express = require("express");
const router = express.Router();
const controller = require("../controllers/sports_news_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Sports News
 *   description: Sports news articles management
 */

/**
 * @swagger
 * /api/v1/sports_news_route:
 *   post:
 *     summary: Create a new sports news article
 *     tags: [Sports News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SportsNews'
 *     responses:
 *       201:
 *         description: News article created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateToken, controller.createNews);

/**
 * @swagger
 * /api/v1/sports_news_route:
 *   get:
 *     summary: Get all sports news articles
 *     tags: [Sports News]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of articles returned
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of all sports news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SportsNews'
 */
router.get("/", controller.getAllNews);

/**
 * @swagger
 * /api/v1/sports_news_route/recent:
 *   get:
 *     summary: Get recent sports news articles
 *     tags: [Sports News]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Limit number of recent articles returned (default 5)
 *     responses:
 *       200:
 *         description: List of recent sports news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SportsNews'
 */
router.get("/recent", controller.getRecentNews);

/**
 * @swagger
 * /api/v1/sports_news_route/search:
 *   get:
 *     summary: Search sports news articles by title
 *     tags: [Sports News]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query (searches in article titles)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of articles returned
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of matching sports news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SportsNews'
 *       400:
 *         description: Invalid search parameters
 */
router.get("/search", controller.searchNewsByTitle);

/**
 * @swagger
 * /api/v1/sports_news_route/category/{category}:
 *   get:
 *     summary: Get sports news articles by category
 *     tags: [Sports News]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *           enum: [
 *             "Football",
 *             "Cricket",
 *             "Basketball",
 *             "Rugby",
 *             "Tennis",
 *             "Athletics",
 *             "Boxing",
 *             "Formula 1",
 *             "Golf",
 *             "Other"
 *           ]
 *         required: true
 *         description: Category to filter by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of articles returned
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of filtered sports news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SportsNews'
 *       400:
 *         description: Invalid category parameter
 */
router.get("/category/:category", controller.getNewsByCategory);

/**
 * @swagger
 * /api/v1/sports_news_route/{id}:
 *   get:
 *     summary: Get a sports news article by ID
 *     tags: [Sports News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Sports news article data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SportsNews'
 *       404:
 *         description: Article not found
 */
router.get("/:id", controller.getNewsById);

/**
 * @swagger
 * /api/v1/sports_news_route/{id}:
 *   put:
 *     summary: Update a sports news article
 *     tags: [Sports News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SportsNews'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.put("/:id", authenticateToken, controller.updateNewsById);

/**
 * @swagger
 * /api/v1/sports_news_route/{id}:
 *   delete:
 *     summary: Delete a sports news article
 *     tags: [Sports News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
router.delete("/:id", authenticateToken, controller.deleteNewsById);

module.exports = router;