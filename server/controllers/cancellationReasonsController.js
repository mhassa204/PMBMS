const CancellationReasonModel = require("../models/CancellationReasonModel");
const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");

// Create and Save a new CancellationReason
exports.create = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const cancellationReason = new CancellationReasonModel(req.body);
      const newCancellationReason = await cancellationReason.save();
      res.status(201).json(newCancellationReason);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

// Retrieve and return all CancellationReasons from the database.
exports.findAllReasons = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const cancellationReasons = await CancellationReasonModel.find();
      res.status(200).json(cancellationReasons);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

// Find a single CancellationReason with a cancellationReasonId
exports.findOneReason = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const cancellationReason = await CancellationReasonModel.findById(
        req.params.id
      );
      if (!cancellationReason) {
        return res
          .status(404)
          .json({ message: "CancellationReason not found" });
      }
      res.status(200).json(cancellationReason);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

// Update a CancellationReason identified by the cancellationReasonId in the request
exports.updateReason = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const cancellationReason =
        await CancellationReasonModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
      if (!cancellationReason) {
        return res
          .status(404)
          .json({ message: "CancellationReason not found" });
      }
      res.status(200).json(cancellationReason);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];

// Delete a CancellationReason with the specified cancellationReasonId in the request
exports.deleteReason = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const cancellationReason =
        await CancellationReasonModel.findByIdAndDelete(req.params.id);
      if (!cancellationReason) {
        return res
          .status(404)
          .json({ message: "CancellationReason not found" });
      }
      res.status(200).json({ message: "CancellationReason deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
];
