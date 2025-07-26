const orderProductService = require("../services/order_product_service");

class OrderProductController {
  // Create a new order
  async createOrder(req, res) {
    try {
      const order = await orderProductService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all orders
  async getAllOrders(req, res) {
    try {
      const orders = await orderProductService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get order by ID
  async getOrderById(req, res) {
    try {
      const order = await orderProductService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get orders by customer email
  async getOrdersByCustomerEmail(req, res) {
    try {
      const orders = await orderProductService.getOrdersByCustomerEmail(req.params.email);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update order by ID
  async updateOrder(req, res) {
    try {
      const order = await orderProductService.updateOrder(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete order by ID
  async deleteOrder(req, res) {
    try {
      const order = await orderProductService.deleteOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update order status
  async updateOrderStatus(req, res) {
    try {
      const order = await orderProductService.updateOrderStatus(req.params.id, req.body.status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update payment status
  async updatePaymentStatus(req, res) {
    try {
      const order = await orderProductService.updatePaymentStatus(req.params.id, req.body.status);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderProductController();