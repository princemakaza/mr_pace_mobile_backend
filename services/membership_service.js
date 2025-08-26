const Membership = require("../models/membership_model");
const User = require("../models/user_model");
const Profile = require("../models/profile_model");
const PDFDocument = require("pdfkit");
const fs = require("fs");

class MembershipService {
  // Create a new membership
  async createMembership(membershipData) {
    try {
      const membership = new Membership(membershipData);
      return await membership.save();
    } catch (error) {
      throw error;
    }
  }

  // Get all memberships
  async getAllMemberships() {
    try {
      return await Membership.find()
        .populate("userId", "userName email -_id")
        .populate("profileId", "firstName lastName profilePicture -_id")
        .populate("approvedBy", "userName -_id");
    } catch (error) {
      throw error;
    }
  }

  // Get membership by ID
  async getMembershipById(membershipId) {
    try {
      return await Membership.findById(membershipId)
        .populate("userId", "userName email -_id")
        .populate("profileId")
        .populate("approvedBy", );
    } catch (error) {
      throw error;
    }
  }

  // Get membership by user ID
  async getMembershipByUserId(userId) {
    try {
      return await Membership.findOne({ userId })
        .populate("userId", "userName email -_id")
        .populate("profileId", "firstName lastName profilePicture -_id")
        .populate("approvedBy", "userName -_id");
    } catch (error) {
      throw error;
    }
  }

  // Update membership by ID
  async updateMembership(membershipId, updateData) {
    try {
      return await Membership.findByIdAndUpdate(membershipId, updateData, {
        new: true,
      })
        .populate("userId")
        .populate("profileId")
        .populate("approvedBy");
    } catch (error) {
      throw error;
    }
  }

  // Delete membership by ID
  async deleteMembership(membershipId) {
    try {
      return await Membership.findByIdAndDelete(membershipId);
    } catch (error) {
      throw error;
    }
  }

  // Approve membership
  async approveMembership(membershipId, approvedBy) {
    try {
      return await Membership.findByIdAndUpdate(
        membershipId,
        {
          membershipStatus: "active",
          approvedBy,
        },
        { new: true }
      )
        .populate("userId", "userName email -_id")
        .populate("profileId", "firstName lastName profilePicture")
        .populate("approvedBy", "userName -_id");
    } catch (error) {
      throw error;
    }
  }

  async generateMembershipCertificate(userId) {
    try {
      const membership = await Membership.findOne({ userId })
        .populate("userId", "userName email -_id")
        .populate("profileId", "firstName lastName profilePicture -_id");

      if (!membership) {
        throw new Error("Membership not found");
      }

      return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
          size: "A4",
          layout: "landscape", // Changed to landscape for better certificate layout
          info: {
            Title: "MR PACE Athletics Club Membership Certificate",
            Author: "MR PACE Athletics Club",
          },
        });

        // Create buffers to store the PDF
        const chunks = [];
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => {
          const pdfBuffer = Buffer.concat(chunks);
          const base64String = pdfBuffer.toString("base64");
          resolve({
            pdf: base64String,
            filename: `MRPACE_Membership_Certificate_${membership.profileId.firstName}_${membership.profileId.lastName}.pdf`,
          });
        });
        doc.on("error", (error) => {
          reject(error);
        });

        // Add content to the PDF
        this._generateCertificateContent(doc, membership);

        doc.end();
      });
    } catch (error) {
      throw error;
    }
  }

  async _generateCertificateContent(doc, membership) {
    const colors = {
      red: "#E31E24",
      green: "#2E8B57",
      gold: "#FFD700",
      black: "#1a1a1a",
      white: "#FFFFFF",
      gray: "#f5f5f5",
      darkGray: "#333333",
    };

    const { width, height } = doc.page;

    const padding = 40;

    // Background
    doc.rect(0, 0, width, height).fill(colors.white);

    // Red Outer Border
    doc
      .lineWidth(16)
      .strokeColor(colors.red)
      .rect(8, 8, width - 16, height - 16)
      .stroke();

    // Green Inner Border
    doc
      .lineWidth(2)
      .strokeColor(colors.green)
      .rect(24, 24, width - 48, height - 48)
      .stroke();

    // Header Green Box
    const headerHeight = 80;
    doc
      .fillColor(colors.green)
      .rect(24, 24, width - 48, headerHeight)
      .fill();

    // Logo
    try {
      const path = require("path");
      const logoPath = path.join(__dirname, "logo.png");
      doc.image(logoPath, 36, 30, { width: 60 });
    } catch (err) {
      console.log("Failed to load logo", err);
    }

    // Header Text
    doc
      .fillColor(colors.white)
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("MR PACE ATHLETICS CLUB", 110, 35, { align: "left" });

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Excellence in Athletics • Building Champions", 110, 60, {
        align: "left",
      });

    // Certificate Title
    doc
      .fillColor(colors.red)
      .fontSize(28)
      .font("Helvetica-Bold")
      .text("CERTIFICATE OF MEMBERSHIP", 0, 120, {
        align: "center",
      });

    // "This is to certify that"
    doc
      .fontSize(14)
      .fillColor(colors.black)
      .text("This is to certify that", 0, 160, { align: "center" });

    // Member Name with gray background box
    const fullName = `${membership.profileId.firstName} ${membership.profileId.lastName}`;
    const nameBoxWidth = 400;
    const nameBoxX = (width - nameBoxWidth) / 2;

    doc
      .rect(nameBoxX, 185, nameBoxWidth, 40)
      .fill(colors.gray)
      .strokeColor(colors.green)
      .lineWidth(1)
      .stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .fillColor(colors.red)
      .text(fullName, 0, 195, { align: "center" });

    // Description Line
    doc
      .font("Helvetica")
      .fontSize(13)
      .fillColor(colors.black)
      .text("is hereby recognized as an official member of", 0, 240, {
        align: "center",
      });

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("MR PACE ATHLETICS CLUB", 0, 260, { align: "center" });

    // Membership Info Boxes
    const boxWidth = 150;
    const boxHeight = 45;
    const boxY = 300;
    const spacing = 20;
    const totalBoxWidth = 3 * boxWidth + 2 * spacing;
    const startX = (width - totalBoxWidth) / 2;

    // Box 1: Membership Type
    doc.rect(startX, boxY, boxWidth, boxHeight).fill(colors.green);
    doc
      .fillColor(colors.white)
      .font("Helvetica-Bold")
      .fontSize(8)
      .text("MEMBERSHIP TYPE", startX + 10, boxY + 6);
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(membership.membershipType.toUpperCase(), startX + 10, boxY + 20);

    // Box 2: Status
    const box2X = startX + boxWidth + spacing;
    doc.rect(box2X, boxY, boxWidth, boxHeight).fill(colors.red);
    doc
      .fillColor(colors.white)
      .font("Helvetica-Bold")
      .fontSize(8)
      .text("STATUS", box2X + 10, boxY + 6);
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(membership.membershipStatus.toUpperCase(), box2X + 10, boxY + 20);

    // Box 3: Member Since
    const box3X = box2X + boxWidth + spacing;
    doc.rect(box3X, boxY, boxWidth, boxHeight).fill(colors.gold);
    doc
      .fillColor(colors.black)
      .font("Helvetica-Bold")
      .fontSize(8)
      .text("MEMBER SINCE", box3X + 10, boxY + 6);
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(
        new Date(membership.joinDate).toDateString(),
        box3X + 10,
        boxY + 20
      );

    // Email
    doc
      .fillColor(colors.darkGray)
      .fontSize(10)
      .font("Helvetica")
      .text(`Email: ${membership.userId.email}`, 0, boxY + 60, {
        align: "center",
      });

    // Footer
    const footerY = height - 100;
    doc
      .fillColor(colors.black)
      .fontSize(10)
      .text(`Date Issued: ${new Date().toDateString()}`, 40, footerY);

    // Signature
    const sigX = width - 220;
    doc
      .strokeColor(colors.black)
      .lineWidth(1)
      .moveTo(sigX, footerY + 25)
      .lineTo(sigX + 120, footerY + 25)
      .stroke();

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("Colleen Makaza", sigX, footerY + 30);
    doc
      .fontSize(9)
      .font("Helvetica")
      .text("Chairman", sigX, footerY + 44)
      .text("MR PACE Athletics Club", sigX, footerY + 56);

    // Certificate ID
    const certId = `MRPACE-${membership._id
      .toString()
      .slice(-8)
      .toUpperCase()}`;
    doc
      .fillColor(colors.gray)
      .fontSize(7)
      .text(`Certificate ID: ${certId}`, 40, footerY + 50);
  }
}

module.exports = new MembershipService();
