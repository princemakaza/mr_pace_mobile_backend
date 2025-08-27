const InjurySolutionPurchaseService = require("../services/injury_solution_purchase_service");
const InjuryExerciseSolutionService = require("../services/injury_exercise_solution_service");
const UserService = require("../services/user_services");
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

// Email sending function for injury solution purchases
const sendPurchaseEmail = async (
  email,
  userName,
  solutionName,
  injuryType,
  price
) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: `☕ Thanks for Buying Coffee for Our Coaches!`,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 40px 0; margin: 0;">
      <div style="max-width: 650px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; font-size: 28px; margin: 0; font-weight: 700;">
            Thank You for the Coffee! ☕
          </h1>
          <p style="color: #fee2e2; font-size: 16px; margin: 8px 0 0 0;">
            Your support means a lot to our amazing coaches
          </p>
        </div>
        
        <!-- Support Confirmation -->
        <div style="background: linear-gradient(90deg, #ef4444, #f87171, #fca5a5); padding: 2px;">
          <div style="background: #fef2f2; padding: 20px; text-align: center;">
            <div style="display: inline-block; background: #ef4444; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 18px;">
              🎉 Contribution Successful
            </div>
          </div>
        </div>
        
        <!-- Body Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Hey ${userName},</h2>
          
          <p style="font-size: 17px; color: #374151; line-height: 1.6; margin-bottom: 25px;">
            You just bought our coaches a coffee while getting access to <strong style="color: #ef4444;">${solutionName}</strong> for your <strong>${injuryType}</strong>. 
            We can’t thank you enough for supporting the people who make recovery possible!
          </p>
          
          <!-- Support Details Card -->
          <div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              Your Support Details
            </p>
            <div style="font-size: 24px; font-weight: 700; color: #ef4444; margin-bottom: 8px;">${solutionName}</div>
            <p style="color: #6b7280; font-size: 16px; margin: 8px 0;">Injury Type: ${injuryType}</p>
            <p style="color: #6b7280; font-size: 16px; margin: 8px 0;">Contribution: $${price}</p>
          </div>
          
          <!-- What's Next -->
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">💡 What's Next?</h3>
            <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Enjoy the injury recovery solution included with your coffee gift</li>
              <li>Follow the guided exercises and tips for your recovery</li>
              <li>Keep supporting our coaches — they truly appreciate you!</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Remember: every coffee keeps our recovery community strong and motivated. Thanks for being part of this journey!
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Cheers to your recovery and your generosity! ☕
            </p>
            
            <p style="font-size: 16px; color: #6b7280; margin: 0;">
              Best regards,<br>
              <strong style="color: #ef4444;">The Recovery Coaches Team</strong>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: linear-gradient(90deg, #ef4444, #f87171, #fca5a5); padding: 2px;">
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <small style="color: #9ca3af; font-size: 14px;">
              © 2025 Recovery Community • Thank you for fueling the journey!<br>
              <span style="color: #6b7280;">Every coffee makes a difference</span>
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
      `Purchase email sent successfully to ${email} for ${solutionName}`
    );
  } catch (error) {
    console.error("Error sending email:", error);
    // Do not throw to avoid breaking the flow if email fails
  }
};

class InjurySolutionPurchaseController {
  static async createPurchase(req, res, next) {
    try {
      const purchaseData = req.body;
      const newPurchase = await InjurySolutionPurchaseService.createPurchase(
        purchaseData
      );

      // Get user and solution details for email
      const user = await UserService.getUserById(purchaseData.userId);
      const solution = await InjuryExerciseSolutionService.getSolutionById(
        purchaseData.injury_solution_id
      );

      // Send purchase confirmation email
      await sendPurchaseEmail(
        user.email,
        user.userName,
        solution.name || "Injury Solution",
        solution.injuryType,
        solution.price
      );

      return res.status(201).json(newPurchase);
    } catch (error) {
      next(error);
    }
  }

  static async getAllPurchases(req, res, next) {
    try {
      const purchases = await InjurySolutionPurchaseService.getAllPurchases();
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchaseById(req, res, next) {
    try {
      const purchaseId = req.params.id;
      const purchase = await InjurySolutionPurchaseService.getPurchaseById(
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
      const { status, pollUrl } = req.body;
      const updatedPurchase =
        await InjurySolutionPurchaseService.updatePaymentStatus(
          purchaseId,
          status,
          pollUrl
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
      const purchases = await InjurySolutionPurchaseService.getPurchasesByUser(
        userId
      );
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchasesBySolution(req, res, next) {
    try {
      const solutionId = req.params.solutionId;
      const purchases =
        await InjurySolutionPurchaseService.getPurchasesBySolution(solutionId);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchasesByStatus(req, res, next) {
    try {
      const status = req.params.status;
      const purchases =
        await InjurySolutionPurchaseService.getPurchasesByStatus(status);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  // New: Pay for injury solution with EcoCash
  static async payByEcocash(req, res, next) {
    try {
      const { purchaseId, phoneNumber } = req.body;

      const purchase = await InjurySolutionPurchaseService.getPurchaseById(
        purchaseId
      );

      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      if (purchase.paymentStatus === "paid") {
        return res.status(400).json({ error: "Payment already completed" });
      }

      // Get solution details to know the price
      const solution = await InjuryExerciseSolutionService.getSolutionById(
        purchase.injury_solution_id
      );

      const invoiceNumber = `INJ-INV-${Date.now()}`;
      const payment = paynow.createPayment(
        invoiceNumber,
        "zondaimakaza01@gmail.com"
      );

      payment.add(solution.name || "Injury Solution", solution.price);

      const response = await paynow.sendMobile(payment, phoneNumber, "ecocash");

      if (response.success) {
        await InjurySolutionPurchaseService.updatePaymentStatus(
          purchaseId,
          "pending",
          response.pollUrl
        );

        res.json({
          success: true,
          message: "Payment initiated",
          pollUrl: response.pollUrl,
          purchaseId,
        });
      } else {
        await InjurySolutionPurchaseService.updatePaymentStatus(
          purchaseId,
          "failed"
        );
        res.status(500).json({ error: response.errors });
      }
    } catch (error) {
      next(error);
    }
  }

  // New: Check payment status for injury solution purchase
  static async checkPaymentStatus(req, res, next) {
    const { pollUrl, purchaseId } = req.body;

    try {
      // Poll transaction from Paynow
      const status = await paynow.pollTransaction(pollUrl);

      // Find purchase by ID
      const purchase = await InjurySolutionPurchaseService.getPurchaseById(
        purchaseId
      );

      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      // Update payment status in DB
      await InjurySolutionPurchaseService.updatePaymentStatus(
        purchaseId,
        status.status
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

module.exports = InjurySolutionPurchaseController;
