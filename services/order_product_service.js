const Order = require("../models/order_product_model");

class OrderProductService {
  // Create a new order
  async createOrder(orderData) {
    try {
      const order = new Order(orderData);
      return await order.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all orders
  async getAllOrders() {
    try {
      return await Order.find().populate("products.productId");
    } catch (error) {
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(orderId) {
    try {
      return await Order.findById(orderId).populate("products.productId");
    } catch (error) {
      throw error;
    }
  }

  // Get orders by customer email
  async getOrdersByCustomerEmail(email) {
    try {
      return await Order.find({ customerEmail: email }).populate(
        "products.productId"
      );
    } catch (error) {
      throw error;
    }
  }

  // Update order by ID
  async updateOrder(orderId, updateData) {
    try {
      return await Order.findByIdAndUpdate(orderId, updateData, {
        new: true,
      }).populate("products.productId");
    } catch (error) {
      throw error;
    }
  }

  // Delete order by ID
  async deleteOrder(orderId) {
    try {
      return await Order.findByIdAndDelete(orderId);
    } catch (error) {
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      return await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: status },
        { new: true }
      ).populate("products.productId");
    } catch (error) {
      throw error;
    }
  }

  // Update payment status
  async updatePaymentStatus(orderId, status) {
    try {
      return await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: status },
        { new: true }
      ).populate("products.productId");
    } catch (error) {
      throw error;
    }
  }

  async updatePollUrl(orderId, pollUrl) {
    try {
      return await Order.findByIdAndUpdate(
        orderId,
        { pollUrl },
        { new: true }
      ).populate("products.productId");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrderProductService();
