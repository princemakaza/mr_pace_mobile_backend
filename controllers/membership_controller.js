const membershipService = require("../services/membership_service");
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

// Email sending function for membership application
const sendMembershipApplicationEmail = async (email, userName) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: `🏃‍♂️ Your MR PACE Athletics Club Membership Application Received`,
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; padding: 40px 0; margin: 0;">
      <div style="max-width: 650px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15); overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #E31E24 0%, #B91C1C 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; font-size: 28px; margin: 0; font-weight: 700;">
            Welcome to MR PACE Athletics Club! 🏃‍♂️
          </h1>
          <p style="color: #FECACA; font-size: 16px; margin: 8px 0 0 0;">
            Your journey to athletic excellence begins here
          </p>
        </div>
        
        <!-- Application Confirmation -->
        <div style="background: linear-gradient(90deg, #E31E24, #EF4444, #F87171); padding: 2px;">
          <div style="background: #FEF2F2; padding: 20px; text-align: center;">
            <div style="display: inline-block; background: #E31E24; color: white; padding: 12px 24px; border-radius: 50px; font-weight: 600; font-size: 18px;">
              🎉 Application Received
            </div>
          </div>
        </div>
        
        <!-- Body Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Hey ${userName},</h2>
          
          <p style="font-size: 17px; color: #374151; line-height: 1.6; margin-bottom: 25px;">
            We've received your application to join <strong style="color: #E31E24;">MR PACE Athletics Club</strong>. 
            We're excited to have you on board and can't wait to help you achieve your athletic goals!
          </p>
          
          <!-- Next Steps Card -->
          <div style="background: #FEF2F2; border: 2px solid #E31E24; border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
              Next Steps
            </p>
            <div style="font-size: 24px; font-weight: 700; color: #E31E24; margin-bottom: 8px;">Complete Your Payment</div>
            <p style="color: #6b7280; font-size: 16px; margin: 8px 0;">To finalize your membership, please complete the payment process</p>
          </div>
          
          <!-- Payment Instructions -->
          <div style="background: #FEF2F2; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">💳 How to Complete Payment</h3>
            <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Use the EcoCash payment option in your membership dashboard</li>
              <li>Follow the prompts to complete your payment</li>
              <li>Your membership will be activated once payment is confirmed</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
            If you have any questions, feel free to contact us at any time. We're here to help you every step of the way!
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
              Ready to run with the best! 🏆
            </p>
            
            <p style="font-size: 16px; color: #6b7280; margin: 0;">
              Best regards,<br>
              <strong style="color: #E31E24;">The MR PACE Athletics Club Team</strong>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: linear-gradient(90deg, #E31E24, #EF4444, #F87171); padding: 2px;">
          <div style="background: #1f2937; padding: 20px; text-align: center;">
            <small style="color: #9ca3af; font-size: 14px;">
              © 2025 MR PACE Athletics Club • Building Champions, Creating Legends<br>
              <span style="color: #6b7280;">Excellence in Athletics</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Membership application email sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    // Do not throw to avoid breaking the flow if email fails
  }
};

class MembershipController {
  // Create a new membership
  async createMembership(req, res) {
    try {
      const membership = await membershipService.createMembership(req.body);

      // Get user details for email
      const user = await UserService.getUserById(req.body.userId);

      // Send membership application email
      await sendMembershipApplicationEmail(user.email, user.userName);

      res.status(201).json(membership);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all memberships
  async getAllMemberships(req, res) {
    try {
      const memberships = await membershipService.getAllMemberships();
      res.status(200).json(memberships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get membership by ID
  async getMembershipById(req, res) {
    try {
      const membership = await membershipService.getMembershipById(
        req.params.id
      );
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.status(200).json(membership);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get membership by user ID
  async getMembershipByUserId(req, res) {
    try {
      const membership = await membershipService.getMembershipByUserId(
        req.params.userId
      );
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.status(200).json(membership);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update membership by ID
  async updateMembership(req, res) {
    try {
      const membership = await membershipService.updateMembership(
        req.params.id,
        req.body
      );
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.status(200).json(membership);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete membership by ID
  async deleteMembership(req, res) {
    try {
      const membership = await membershipService.deleteMembership(
        req.params.id
      );
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.status(200).json({ message: "Membership deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Approve membership
  async approveMembership(req, res) {
    try {
      const membership = await membershipService.approveMembership(
        req.params.id,
        req.user._id // Assuming authenticated user is the approver
      );
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.status(200).json(membership);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Generate membership certificate
  async generateMembershipCertificate(req, res) {
    try {
      const { pdf, filename } =
        await membershipService.generateMembershipCertificate(
          req.params.userId
        );

      // Set headers for PDF download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );

      // Convert base64 back to buffer and send
      const pdfBuffer = Buffer.from(pdf, "base64");
      res.status(200).send(pdfBuffer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Pay for membership with EcoCash
  async payByEcocash(req, res) {
    try {
      const { membershipId, phoneNumber } = req.body;

      const membership = await membershipService.getMembershipById(
        membershipId
      );

      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }

      if (membership.paymentStatus === "paid") {
        return res.status(400).json({ error: "Payment already completed" });
      }

      // Set membership price based on type
      const membershipPrices = {
        athlete: 50,
        coach: 100,
        official: 75,
      };

      const price =  3.5;

      const invoiceNumber = `MEM-INV-${Date.now()}`;
      const payment = paynow.createPayment(
        invoiceNumber,
        "zondaimakaza01@gmail.com"
      );

      payment.add(`MR PACE ${membership.membershipType} Membership`, price);

      const response = await paynow.sendMobile(payment, phoneNumber, "ecocash");

      if (response.success) {
        await membershipService.updateMembership(membershipId, {
          paymentStatus: "pending",
          pollUrl: response.pollUrl,
        });

        res.json({
          success: true,
          message: "Payment initiated",
          pollUrl: response.pollUrl,
          membershipId,
        });
      } else {
        await membershipService.updateMembership(membershipId, {
          paymentStatus: "failed",
        });
        res.status(500).json({ error: response.errors });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Check payment status for membership
  async checkPaymentStatus(req, res) {
    const { pollUrl, membershipId } = req.body;

    try {
      // Poll transaction from Paynow
      const status = await paynow.pollTransaction(pollUrl);

      // Find membership by ID
      const membership = await membershipService.getMembershipById(
        membershipId
      );

      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }

      // Update payment status in DB
      await membershipService.updateMembership(membershipId, {
        paymentStatus: status.status,
      });

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
        membershipId: membership._id,
        pollUrl: pollUrl,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MembershipController();
