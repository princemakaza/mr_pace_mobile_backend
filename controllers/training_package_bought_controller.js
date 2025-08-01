const TrainingPackageBoughtService = require("../services/training_package_bought_service");

class TrainingPackageBoughtController {
  static async createPurchase(req, res, next) {
    try {
      const purchaseData = req.body;
      const newPurchase = await TrainingPackageBoughtService.createPurchase(purchaseData);
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
      const purchase = await TrainingPackageBoughtService.getPurchaseById(purchaseId);
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
      const updatedPurchase = await TrainingPackageBoughtService.updatePaymentStatus(purchaseId, status);
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
      const purchases = await TrainingPackageBoughtService.getPurchasesByUser(userId);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchasesByPackage(req, res, next) {
    try {
      const packageId = req.params.packageId;
      const purchases = await TrainingPackageBoughtService.getPurchasesByPackage(packageId);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TrainingPackageBoughtController;