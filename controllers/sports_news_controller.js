const sportsNewsService = require("../services/sports_news_services");

// Create
const createNews = async (req, res) => {
  try {
    const news = await sportsNewsService.createNews(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all
const getAllNews = async (req, res) => {
  try {
    const newsList = await sportsNewsService.getAllNews();
    res.status(200).json(newsList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID
const getNewsById = async (req, res) => {
  try {
    const news = await sportsNewsService.getNewsById(req.params.id);
    if (!news) return res.status(404).json({ error: "News not found" });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateNewsById = async (req, res) => {
  try {
    const updated = await sportsNewsService.updateNewsById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "News not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
const deleteNewsById = async (req, res) => {
  try {
    const deleted = await sportsNewsService.deleteNewsById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "News not found" });
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by category
const getNewsByCategory = async (req, res) => {
  try {
    const news = await sportsNewsService.getNewsByCategory(req.params.category);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search by title
const searchNewsByTitle = async (req, res) => {
  try {
    const results = await sportsNewsService.searchNewsByTitle(req.query.q);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent
const getRecentNews = async (req, res) => {
  try {
    const news = await sportsNewsService.getRecentNews(parseInt(req.query.limit) || 5);
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
  getNewsByCategory,
  searchNewsByTitle,
  getRecentNews,
};
