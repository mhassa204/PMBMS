const IncomeCategory = require("../models/IncomeCategoryModel");
const verifyToken = require("../middleware/accessAuth");

// get all income categories
exports.getIncomeCategories = [
  verifyToken,
  async (req, res) => {
    try {
      const currentPage = parseInt(req.params.currentPage);
      const itemsPerPage = parseInt(req.params.itemsPerPage);
      const incomeCategories = await IncomeCategory.find()
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const totalItems = await IncomeCategory.countDocuments();
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (!incomeCategories) {
        return res.status(404).json({
          message: "income categories not found",
        });
      }
      res.status(200).json({
        message: "income categories retrieved successfully",
        incomeCategories: incomeCategories,
        totalPages: totalPages,
      });
    } catch (err) {
      res.status(404).json({
        message: "income categories cannot be retrieved",
        error: err,
      });
    }
  },
];

// create an income category
exports.createIncomeCategory = [
  verifyToken,
  async (req, res) => {
    try {
      const incomeCategory = await new IncomeCategory(req.body);
      await incomeCategory.save();
      res.status(201).json({
        message: "income category created successfully",
        incomeCategory: incomeCategory,
      });
    } catch (err) {
      res.status(400).json({
        message: "income category cannot be created",
        error: err,
      });
    }
  },
];

// update an income category
exports.updateIncomeCategory = [
  verifyToken,
  async (req, res) => {
    try {
      const incomeCategory = await IncomeCategory.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(201).json({
        message: "income category updated successfully",
        incomeCategory: incomeCategory,
      });
    } catch (err) {
      res.status(400).json({
        message: "income category cannot be updated",
        error: err,
      });
    }
  },
];

// delete an income category
exports.deleteIncomeCategory = [
  verifyToken,
  async (req, res) => {
    try {
      const incomeCategory = await IncomeCategory.findByIdAndDelete(
        req.params.id
      );
      res.status(201).json({
        message: "income category deleted successfully",
        incomeCategory: incomeCategory,
      });
    } catch (err) {
      res.status(400).json({
        message: "income category cannot be deleted",
        error: err,
      });
    }
  },
];

// get an income category
exports.getIncomeCategory = [
  verifyToken,
  async (req, res) => {
    try {
      const incomeCategory = await IncomeCategory.findById(req.params.id);
      res.status(200).json({
        message: "income category retrieved successfully",
        incomeCategory: incomeCategory,
      });
    } catch (err) {
      res.status(400).json({
        message: "income category cannot be retrieved",
        error: err,
      });
    }
  },
];
