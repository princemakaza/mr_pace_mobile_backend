const nodemailer = require("nodemailer");
const orderProductService = require("../services/order_product_service");
require("dotenv").config();

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOrderConfirmationEmail = async (order) => {
  const { customerName, customerEmail, orderStatus, products, totalAmount } =
    order;

  // Format products list for email
  const productsList = products
    .map(
      (product) => `
    <div style="padding: 15px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between;">
      <div>
        <strong>${product.name}</strong><br>
        <small>Size: ${product.size}, Color: ${product.color}</small>
      </div>
      <div style="text-align: right;">
        ${product.quantity} × $${product.price.toFixed(2)}<br>
        <strong>$${(product.quantity * product.price).toFixed(2)}</strong>
      </div>
    </div>
  `
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: customerEmail,
    subject: `✅ Order Confirmed - #${order._id}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 40px 0; margin: 0;">
        <div style="max-width: 650px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); overflow: hidden;">
          
          <!-- Header with Logo -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px 20px; text-align: center; position: relative;">
            <h1 style="color: white; font-size: 28px; margin: 0; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Order Confirmed!</h1>
            <p style="color: #fef2f2; font-size: 16px; margin: 8px 0 0 0; font-weight: 300;">Order #${
              order._id
            }</p>
          </div>
          
          <!-- Success Banner -->
          <div style="background: linear-gradient(90deg, #dc2626, #ffffff, #000000); padding: 2px;">
            <div style="background: #f8fafc; padding: 20px; text-align: center;">
              <div style="display: inline-block; background: #dc2626; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 18px;">
                🎉 ORDER CONFIRMED
              </div>
            </div>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Hello ${customerName},</h2>
            
            <p style="font-size: 17px; color: #374151; line-height: 1.6; margin-bottom: 25px;">
              Thank you for your order! We've received it and it's currently being processed. 
              Here's a summary of your purchase:
            </p>
            
            <!-- Order Summary -->
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 25px;">
              ${productsList}
              <div style="padding: 15px; background: #f9fafb; display: flex; justify-content: space-between; font-weight: bold;">
                <div>Total Amount:</div>
                <div>$${totalAmount.toFixed(2)}</div>
              </div>
            </div>
            
            <!-- Order Details -->
            <div style="background: #f9fafb; border-left: 4px solid #000000; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; font-weight: 600;">📦 Order Details</h3>
              <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0 0 10px 0;">
                <strong>Order Status:</strong> ${orderStatus}<br>
                <strong>Payment Method:</strong> ${order.paymentOption}<br>
                <strong>Payment Status:</strong> ${order.paymentStatus}
              </p>
              ${
                order.needsDelivery
                  ? `
                <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 10px 0 0 0;">
                  <strong>Delivery Address:</strong> ${
                    order.shippingAddress
                  }<br>
                  <strong>Delivery Fee:</strong> $${order.deliveryFee.toFixed(
                    2
                  )}
                </p>
              `
                  : ""
              }
            </div>
            
            <!-- What's Next Section -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">📋 What's Next?</h3>
              <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Complete your payment using your chosen method</li>
                <li>Wait for order processing confirmation</li>
                ${
                  order.needsDelivery
                    ? "<li>Prepare to receive your delivery</li>"
                    : "<li>Prepare to collect your order</li>"
                }
                <li>We'll notify you when your order ships</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Thank you for shopping with us. If you have any questions about your order, please reply to this email.
              </p>
              
              <p style="font-size: 16px; color: #6b7280; margin: 0;">
                Best regards,<br>
                <strong style="color: #dc2626;">The Customer Support Team</strong>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(90deg, #dc2626 33%, #ffffff 33%, #ffffff 66%, #000000 66%); padding: 2px;">
            <div style="background: #1f2937; padding: 20px; text-align: center;">
              <small style="color: #9ca3af; font-size: 14px;">
                © ${new Date().getFullYear()} • All rights reserved<br>
                <span style="color: #6b7280;">Powered by passion, driven by excellence</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Order confirmation email sent successfully to ${customerEmail}`
    );
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
    // Don't throw error to avoid breaking the order creation flow
  }
};

class OrderProductController {
  // Create a new order
  async createOrder(req, res) {
    try {
      const order = await orderProductService.createOrder(req.body);

      // Send order confirmation email
      await sendOrderConfirmationEmail(order);

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Order creation failed",
        error: error.message,
      });
    }
  }

  // Get all orders
  async getAllOrders(req, res) {
    try {
      const orders = await orderProductService.getAllOrders();
      res.status(200).json({
        success: true,
        count: orders.length,
        orders: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get order by ID
  async getOrderById(req, res) {
    try {
      const order = await orderProductService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }
      res.status(200).json({
        success: true,
        order: order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Get orders by customer email
  async getOrdersByCustomerEmail(req, res) {
    try {
      const orders = await orderProductService.getOrdersByCustomerEmail(
        req.params.email
      );
      res.status(200).json({
        success: true,
        count: orders.length,
        orders: orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Update order by ID
  async updateOrder(req, res) {
    try {
      const order = await orderProductService.updateOrder(
        req.params.id,
        req.body
      );
      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Delete order by ID
  async deleteOrder(req, res) {
    try {
      const order = await orderProductService.deleteOrder(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Update order status
  async updateOrderStatus(req, res) {
    try {
      const order = await orderProductService.updateOrderStatus(
        req.params.id,
        req.body.status
      );
      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }

      // Here you could add logic to send status update emails if needed

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Update payment status
  async updatePaymentStatus(req, res) {
    try {
      const order = await orderProductService.updatePaymentStatus(
        req.params.id,
        req.body.status
      );
      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }

      // Here you could add logic to send payment confirmation emails if needed

      res.status(200).json({
        success: true,
        message: "Payment status updated successfully",
        order: order,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async payByEcocash(req, res) {
    const { orderId, phoneNumber: mobileNumber } = req.body;

    try {
      const order = await orderProductService.getOrderById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }

      if (order.paymentStatus === "Paid") {
        return res.status(400).json({
          success: false,
          error: "Payment already completed",
        });
      }

      const invoiceNumber = `INV-${Date.now()}`;
      const payment = paynow.createPayment(
        invoiceNumber,
        `${orderId}@customer.com`
      );

      order.products.forEach((product) => {
        payment.add(product.name, product.price * product.quantity);
      });

      if (order.needsDelivery && order.deliveryFee > 0) {
        payment.add("Delivery Fee", order.deliveryFee);
      }

      const response = await paynow.sendMobile(payment, mobileNumber, "ecocash");

      if (response.success) {
        await orderProductService.updatePollUrl(orderId, response.pollUrl);
        await orderProductService.updatePaymentStatus(orderId, "Pending");

        res.json({
          success: true,
          message: "Payment initiated",
          pollUrl: response.pollUrl,
          orderId,
        });
      } else {
        await orderProductService.updatePaymentStatus(orderId, "Failed");
        res.status(500).json({
          success: false,
          error: response.errors,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  // Check payment status
  async checkPaymentStatus(req, res) {
    const { pollUrl, orderId } = req.body;
    console.log("📩 Incoming request body:", req.body);

    try {
      // Poll transaction from Paynow
      const status = await paynow.pollTransaction(pollUrl);
      console.log("✅ Paynow transaction status response:", status);

      // Find order by ID
      const order = await orderProductService.getOrderById(orderId);
      console.log("🛒 Fetched order:", order);

      if (!order) {
        console.warn("⚠️ No order found for ID:", orderId);
        return res.status(404).json({
          success: false,
          error: "Order not found",
        });
      }

      // Update payment status in DB
      await orderProductService.updatePaymentStatus(orderId, status.status);

      console.log(
        `💳 Payment status '${status.status}' updated for order:`,
        orderId
      );

      // Status message mapping
      const statusMessages = {
        paid: "Payment successful",
        cancelled: "Payment was cancelled",
        failed: "Payment failed",
        created: "Payment created but not yet sent",
        sent: "Payment request sent to customer",
        awaiting_delivery: "Payment confirmed, awaiting delivery",
        awaiting_confirmation: "Awaiting payment confirmation",
      };

      const message =
        statusMessages[status.status?.toLowerCase()] ||
        "Payment status retrieved";

      // Return Paynow status with mapped message
      return res.json({
        success: true,
        status: status.status,
        message,
        orderId,
        pollUrl,
      });
    } catch (error) {
      console.error("❌ Error checking payment status:", error);
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new OrderProductController();
