const SportsNews = require("../models/sports_news_model");

// Create
const createNews = async (data) => {
  return await SportsNews.create(data);
};

// Read All
const getAllNews = async () => {
  return await SportsNews.find().sort({ createdAt: -1 });
};

// Read by ID
const getNewsById = async (id) => {
  return await SportsNews.findById(id);
};

// Update by ID
const updateNewsById = async (id, data) => {
  return await SportsNews.findByIdAndUpdate(id, data, { new: true });
};

// Delete by ID
const deleteNewsById = async (id) => {
  return await SportsNews.findByIdAndDelete(id);
};

// Read by Category
const getNewsByCategory = async (category) => {
  return await SportsNews.find({ category }).sort({ createdAt: -1 });
};

// Search by Title
const searchNewsByTitle = async (keyword) => {
  return await SportsNews.find({
    title: { $regex: keyword, $options: "i" },
  });
};

// Get Recent News (e.g., last 5)
const getRecentNews = async (limit = 5) => {
  return await SportsNews.find().sort({ createdAt: -1 }).limit(limit);
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
