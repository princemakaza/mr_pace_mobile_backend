const mongoose = require("mongoose");

const orderedProductSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: String,
    color: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: false,
  },
  pollUrl: {
    type: String,
    default: "not available",
  },
  adminComment: {
    type: String,
    default: "not available",
  },
  needsDelivery: {
    type: Boolean,
    default: false,
  },
  deliveryFee: {
    type: Number,
    default: 0,
  },
  deliveryCoordinates: {
    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },
  },
  products: {
    type: [orderedProductSchema],
    required: true,
    validate: [(array) => array.length > 0, "At least one product is required"],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentOption: {
    type: String,
    enum: ["PayNow", "PayLater"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: [
      "paid",
      "pending",
      "failed",
      "unpaid",
      "cancelled",
      "sent",
      "awaiting_delivery",
      "awaiting_confirmation",
    ],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Completed", "Cancelled"],
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
