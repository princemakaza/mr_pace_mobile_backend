const TrainingPackageBoughtService = require("../services/training_package_bought_service");
const TrainingProgramPackageService = require("../services/training_program_package_service");
const userService = require('../services/user_services');

const { Paynow } = require("paynow");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Initialize Paynow with environment variables
const paynow = new Paynow(process.env.PAYNOW_ID, process.env.PAYNOW_KEY);
paynow.resultUrl = process.env.PAYNOW_RESULT_URL;
paynow.returnUrl = process.env.PAYNOW_RETURN_URL;

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendPurchaseEmail = async (
  email,
  purchaseId,
  name,
  packageTitle,
  price
) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: `✅ Training Package Purchase Confirmed - ${packageTitle}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 40px 0; margin: 0;">
        <div style="max-width: 650px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); overflow: hidden;">
          
          <!-- Header with Red Theme -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px 20px; text-align: center; position: relative;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #dc2626 33%, #ffffff 33%, #ffffff 66%, #000000 66%);"></div>
            <h1 style="color: white; font-size: 28px; margin: 0; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Package Purchase Confirmed!</h1>
            <p style="color: #fef2f2; font-size: 16px; margin: 8px 0 0 0; font-weight: 300;">${packageTitle}</p>
          </div>
          
          <!-- Success Banner -->
          <div style="background: linear-gradient(90deg, #dc2626, #ffffff, #000000); padding: 2px;">
            <div style="background: #f8fafc; padding: 20px; text-align: center;">
              <div style="display: inline-block; background: #dc2626; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 18px;">
                🎉 PURCHASE SUCCESSFUL
              </div>
            </div>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Hello ${name},</h2>
            
            <p style="font-size: 17px; color: #374151; line-height: 1.6; margin-bottom: 25px;">
              Congratulations! You have successfully purchased <strong style="color: #dc2626;">${packageTitle}</strong>. 
              We're excited to help you achieve your training goals!
            </p>
            
            <!-- Purchase Details Card -->
            <div style="background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%); border: 2px solid #dc2626; border-radius: 12px; padding: 25px; margin: 25px 0; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.1);">
              <h3 style="color: #dc2626; font-size: 20px; margin: 0 0 15px 0; font-weight: 600;">Purchase Details</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Package:</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500;">${packageTitle}</p>
                </div>
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Price:</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500;">$${price}</p>
                </div>
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Purchase ID:</p>
                  <p style="color: #1f2937; font-size: 16px; margin: 0; font-weight: 500; font-family: 'Courier New', monospace;">${purchaseId}</p>
                </div>
                <div>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 5px 0; font-weight: 600;">Status:</p>
                  <p style="color: #dc2626; font-size: 16px; margin: 0; font-weight: 500;">Pending Payment</p>
                </div>
              </div>
            </div>
            
            <!-- Payment Instructions -->
            <div style="background: #f9fafb; border-left: 4px solid #dc2626; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 12px 0; font-weight: 600;">💰 Payment Instructions</h3>
              <p style="font-size: 16px; color: #374151; line-height: 1.6; margin: 0;">
                Please use your purchase ID <strong style="color: #dc2626;">${purchaseId}</strong> 
                to proceed with payment via <strong>EcoCash</strong>.
              </p>
            </div>
            
            <!-- Next Steps -->
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">📋 What's Next?</h3>
              <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Complete your payment using EcoCash</li>
                <li>Wait for payment confirmation email</li>
                <li>Access your training materials once payment is confirmed</li>
                <li>Start your training program</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Thank you for choosing our training program. We're excited to be part of your fitness journey!
              </p>
              
              <p style="font-size: 16px; color: #6b7280; margin: 0;">
                Best regards,<br>
                <strong style="color: #dc2626;">The Training Team</strong>
              </p>
            </div>
          </div>
          
          <!-- Footer with Red Theme -->
          <div style="background: linear-gradient(90deg, #dc2626 33%, #ffffff 33%, #ffffff 66%, #000000 66%); padding: 2px;">
            <div style="background: #1f2937; padding: 20px; text-align: center;">
              <div style="margin-bottom: 10px;">
                <span style="color: #dc2626; font-size: 24px; margin: 0 5px;">●</span>
                <span style="color: #ffffff; font-size: 24px; margin: 0 5px;">●</span>
                <span style="color: #ffffff; font-size: 24px; margin: 0 5px;">●</span>
              </div>
              <small style="color: #9ca3af; font-size: 14px;">
                © 2025 Training Program • All rights reserved<br>
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
      `Purchase email sent successfully to ${email} for ${packageTitle}`
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

class TrainingPackageBoughtController {
  static async createPurchase(req, res, next) {
    try {
      const purchaseData = req.body;
      const newPurchase = await TrainingPackageBoughtService.createPurchase(
        purchaseData
      );

      // Send purchase confirmation email
      const user = await userService.getUserById(purchaseData.userId);
      const trainingProgramPackage = await TrainingProgramPackageService.getPackageById(
        purchaseData.training_program_package_id
      );

      if (user && trainingProgramPackage) {
        await sendPurchaseEmail(
          user.email,
          newPurchase._id.toString(),
          user.userName,
          trainingProgramPackage.title,
          trainingProgramPackage.price
        );
      }

      return res.status(201).json(newPurchase);
    } catch (error) {
      next(error);
    }
  }

  static async getAllPurchases(req, res, next) {
    try {
      const purchases = await TrainingPackageBoughtService.getAllPurchases();
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchaseById(req, res, next) {
    try {
      const purchaseId = req.params.id;
      const purchase = await TrainingPackageBoughtService.getPurchaseById(
        purchaseId
      );
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      return res.status(200).json(purchase);
    } catch (error) {
      next(error);
    }
  }

  static async updatePaymentStatus(req, res, next) {
    try {
      const purchaseId = req.params.id;
      const { status } = req.body;
      const updatedPurchase =
        await TrainingPackageBoughtService.updatePaymentStatus(
          purchaseId,
          status
        );
      if (!updatedPurchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      return res.status(200).json(updatedPurchase);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchasesByUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const purchases = await TrainingPackageBoughtService.getPurchasesByUser(
        userId
      );
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchasesByPackage(req, res, next) {
    try {
      const packageId = req.params.packageId;
      const purchases =
        await TrainingPackageBoughtService.getPurchasesByPackage(packageId);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  // EcoCash Payment Methods
  static async payByEcocash(req, res, next) {
    try {
      const { purchaseId, phoneNumber } = req.body;

      const purchase = await TrainingPackageBoughtService.getPurchaseById(
        purchaseId
      );

      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      if (purchase.paymentStatus === "paid") {
        return res.status(400).json({ error: "Payment already completed" });
      }

      const invoiceNumber = `TRAIN-${Date.now()}`;
      const payment = paynow.createPayment(
        invoiceNumber,
        `zondaimakaza01@gmail.com"`
      );

      payment.add(
        purchase.training_program_package_id.title,
        purchase.pricePaid
      );

      const response = await paynow.sendMobile(payment, phoneNumber, "ecocash");

      if (response.success) {
        await TrainingPackageBoughtService.updatePurchase(purchaseId, {
          pollUrl: response.pollUrl,
          paymentStatus: "pending",
        });

        res.json({
          success: true,
          message: "Payment initiated",
          pollUrl: response.pollUrl,
          purchaseId,
        });
      } else {
        await TrainingPackageBoughtService.updatePaymentStatus(
          purchaseId,
          "failed"
        );
        res.status(500).json({ error: response.errors });
      }
    } catch (error) {
      next(error);
    }
  }

  static async checkPaymentStatus(req, res, next) {
    try {
      const { pollUrl, id } = req.body;

      // Poll transaction from Paynow
      const status = await paynow.pollTransaction(pollUrl);

      // Find purchase by ID
      const purchase = await TrainingPackageBoughtService.getPurchaseById(id);

      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      // Update payment status in DB
      await TrainingPackageBoughtService.updatePaymentStatus(id, status.status);

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

      return res.json({
        status: status.status,
        message,
        purchaseId: purchase._id,
        pollUrl: pollUrl,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainingPackageBoughtController;
