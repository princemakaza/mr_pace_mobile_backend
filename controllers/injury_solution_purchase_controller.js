const InjurySolutionPurchaseService = require("../services/injury_solution_purchase_service");

class InjurySolutionPurchaseController {
  static async createPurchase(req, res, next) {
    try {
      const purchaseData = req.body;
      const newPurchase = await InjurySolutionPurchaseService.createPurchase(purchaseData);
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
      const purchase = await InjurySolutionPurchaseService.getPurchaseById(purchaseId);
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
      const updatedPurchase = await InjurySolutionPurchaseService.updatePaymentStatus(
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
      const purchases = await InjurySolutionPurchaseService.getPurchasesByUser(userId);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchasesBySolution(req, res, next) {
    try {
      const solutionId = req.params.solutionId;
      const purchases = await InjurySolutionPurchaseService.getPurchasesBySolution(solutionId);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }

  static async getPurchasesByStatus(req, res, next) {
    try {
      const status = req.params.status;
      const purchases = await InjurySolutionPurchaseService.getPurchasesByStatus(status);
      return res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InjurySolutionPurchaseController;