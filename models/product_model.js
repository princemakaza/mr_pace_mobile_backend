const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Clothing",
      "Supplements",
      "Footwear",
      "Equipment",
      "Accessories",
      "Nutrition",
      "Other",
    ],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  images: [{
    type: String, // URLs or file paths
    required: false,
  }],
  price: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: false,
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    required: false,
  },
  sizeOptions: [{
    type: String, // e.g., "S", "M", "L", "XL", "500g", "1L"
    required: false,
  }],
  colorOptions: [{
    type: String,
    required: false,
  }],
  tags: [{
    type: String, // e.g., "protein", "running", "hydration"
    required: false,
  }],
  rating: {
    type: Number, // average user rating
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Product", productSchema);
