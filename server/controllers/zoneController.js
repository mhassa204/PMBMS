const Zone = require("../models/ZoneModel");
const { isSuperAdmin } = require("../middleware/roles");
const verifyToken = require("../middleware/accessAuth");

// Create a new zone
exports.createZone = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const zone = new Zone(req.body);
    try {
      const newZone = await zone.save();
      res
        .status(201)
        .json({ message: "Zone added successfully", zone: newZone });
    } catch (error) {
      res.status(400).json({ error: "Failed to create zone" });
    }
  },
];

// Get all zones
exports.getZones = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    console.log("hei: ", req.params);
    const currentPage = req.params.currentPage;
    const itemsPerPage = req.params.itemsPerPage;
    try {
      const zones = await Zone.find()
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const totalCount = await Zone.countDocuments();
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      res.json({ zones: zones, totalPages: totalPages });
    } catch (error) {
      res.status(500).json({ error: "Failed to get zones" });
    }
  },
];

// Get a single zone by ID
exports.getZoneById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const zone = await Zone.findById(req.params.id);
      if (!zone) {
        return res.status(404).json({ error: "Zone not found" });
      }
      res.json({ message: "Zone found successfully", zone: zone });
    } catch (error) {
      res.status(500).json({ error: "Failed to get zone" });
    }
  },
];

// Update a zone by ID
exports.updateZoneById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!zone) {
        return res.status(404).json({ error: "Zone not found" });
      }
      res.json({ message: "Zone updated successfully", zone: zone });
    } catch (error) {
      res.status(500).json({ error: "Failed to update zone" });
    }
  },
];

// Delete a zone by ID
exports.deleteZoneById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const zone = await Zone.findByIdAndDelete(req.params.id);
      if (!zone) {
        return res.status(404).json({ error: "Zone not found" });
      }
      res.json({ message: "Zone deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete zone" });
    }
  },
];
