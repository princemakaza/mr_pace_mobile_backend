const membershipService = require("../services/membership_service");

class MembershipController {
  // Create a new membership
  async createMembership(req, res) {
    try {
      const membership = await membershipService.createMembership(req.body);
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
}

module.exports = new MembershipController();
