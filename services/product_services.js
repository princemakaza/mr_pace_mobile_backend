const Product = require("../models/product_model");

const createProduct = async (data) => {
  return await Product.create(data);
};

const getAllProducts = async () => {
  return await Product.find({});
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProductById = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const deleteAllProducts = async () => {
  return await Product.deleteMany({});
};

const getFeaturedProducts = async () => {
  return await Product.find({ isFeatured: true });
};

const getProductsByCategory = async (category) => {
  return await Product.find({ category });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProductById,
  deleteAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
};
