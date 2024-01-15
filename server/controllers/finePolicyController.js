const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");
const FinePolicy = require("../models/FinePolicyModel");
const IncomeCategory = require("../models/IncomeCategoryModel");
const BazarModel = require("../models/BazarModel");

//get all fine policies -done
exports.getFinePolicies = [
  verifyToken,
  async (req, res) => {
    try {
      const currentPage = parseInt(req.params.currentPage);
      const itemsPerPage = parseInt(req.params.itemsPerPage);
      const finepolicies = await FinePolicy.find()
        .populate({
          path: "bazar",
          select: "name",
        })
        .populate({
          path: "incomeCategory",
          select: "name",
        })
        .populate({
          path: "zone",
          select: "zoneName",
        })
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      if (finepolicies.length === 0) {
        return res.status(404).json({
          message: "Fine policies not found",
        });
      }

      const totalItems = await FinePolicy.countDocuments();
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      res.status(200).json({
        message: "Fine policies retrieved",
        finepolicies: finepolicies,
        totalPages: totalPages,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
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

//create a fine policy -done
exports.createFinePolicy = [
  verifyToken,
  async (req, res) => {
    try {
      const finePolicy = await new FinePolicy({
        ...req.body,
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

//update a fine policy -done
exports.updateFinePolicy = [
  verifyToken,
  async (req, res) => {
    try {
      const result = await FinePolicy.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!result) {
        res.status(400).json({
          message: "fine policy not found",
        });
      }
      res.status(201).json({
        message: "fine policy updated successfully",
        finePolicy: result,
      });
    } catch (err) {
      console.log("error");
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
];

//delete a fine policy -done
exports.deleteFinePolicy = [
  verifyToken,
  async (req, res) => {
    try {
      const finePolicy = await FinePolicy.findByIdAndDelete(req.params.id);
      if (!finePolicy) {
        res.status(400).json({
          message: "fine policy not found",
        });
      }
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
