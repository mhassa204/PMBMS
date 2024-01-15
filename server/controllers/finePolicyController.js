const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");
const FinePolicy = require("../models/FinePolicyModel");
const IncomeCategory = require("../models/IncomeCategoryModel");
const BazarModel = require("../models/BazarModel");

//get all fine policies
exports.getFinePolicies = [
  verifyToken,
  async (req, res) => {
    try {
      const finepolicies = await FinePolicy.find()
        .populate({
          path: "bazar",
          select: "name",
        })
        .populate({
          path: "incomeCategory",
          select: "name",
        });
      res.status(201).json({
        message: "fine policies retrieved",
        finepolicies: finepolicies,
      });
    } catch (error) {
      res.status(500).json({
        message: "internal server error",
        error: error,
      });
    }
  },
];

//get a fine policy by id
exports.getFinePolicy = [
  verifyToken,
  async (req, res) => {
    try {
      const finePolicy = await FinePolicy.findById(req.params.id)
        .populate({
          path: "bazar",
          select: "name",
        })
        .populate({
          path: "incomeCategory",
          select: "name",
        });
      if (!finePolicy) {
        res.status(400).json({
          message: "fine policy not found",
        });
      }
      res.status(201).json({
        message: "fine policy found",
        finePolicy: finePolicy,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
];

//create a fine policy
exports.createFinePolicy = [
  verifyToken,
  async (req, res) => {
    try {
      const data = req.body;
      const policy = await FinePolicy.findById(req.params.id);
      if (policy) {
        res.status(400).json({
          message: "fine policy already exist",
        });
      }
      const finePolicy = await new FinePolicy({
        ...body,
        bazar: await BazarModel.findOne({ name: req.body.bazar }),
        incomeCategory: await IncomeCategory.findOne({
          name: req.body.incomeCategory,
        }),
      });
      await finePolicy.save();
      res.status(201).json({
        message: "fine policy created successfully",
        finePolicy: finePolicy,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
];

//update a fine policy
exports.updateFinePolicy = [
  verifyToken,
  async (req, res) => {
    try {
      const finePolicy = await FinePolicy.findById(req.params.id);
      if (!finePolicy) {
        res.status(400).json({
          message: "fine policy not found",
        });
      }
      const data = req.body;
      await FinePolicy.findByIdAndUpdate(req.params.id, data);
      res.status(201).json({
        message: "fine policy updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
];

//delete a fine policy
exports.deleteFinePolicy = [
  verifyToken,
  async (req, res) => {
    try {
      const finePolicy = await FinePolicy.findById(req.params.id);
      if (!finePolicy) {
        res.status(400).json({
          message: "fine policy not found",
        });
      }
      await FinePolicy.findByIdAndDelete(req.params.id);
      res.status(201).json({
        message: "fine policy deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
];
