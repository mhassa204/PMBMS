const Zone = require("../models/ZoneModel");
const User = require("../models/UserModel");
const { isSuperAdmin } = require("../middleware/roles");
const verifyToken = require("../middleware/accessAuth");

// Create a new zone
exports.createZone = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const {
        zoneName,
        province,
        zoneDistrict,
        citiesInZone,
        zoneManager,
        active,
      } = req.body;
      // console.log(req.body);

      if (
        !zoneName ||
        !province ||
        !zoneDistrict ||
        !citiesInZone ||
        !zoneManager
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const newZone = new Zone({
        zoneName,
        province,
        zoneDistrict,
        citiesInZone,
        zoneManager: zoneManager,
        active: active,
      });
      await newZone.save();
      res
        .status(201)
        .json({ message: "Zone added successfully", zone: newZone });
    } catch (error) {
      console.error("Error creating zone:", error);
      res.status(500).json({ error: "Failed to create zone" });
    }
  },
];

// Get all zones
exports.getZones = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const currentPage = req.params.currentPage;
    const itemsPerPage = req.params.itemsPerPage;
    try {
      const zones = await Zone.find()
        .populate({
          path: "zoneManager",
          select: "userName",
        })
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const formatedZones = zones.map((zone) => {
        return {
          _id: zone._id,
          zoneName: zone.zoneName,
          province: zone.province,
          zoneDistrict: zone.zoneDistrict,
          citiesInZone: zone.citiesInZone,
          zoneManager: zone.zoneManager.userName,
          active: zone.active,
        };
      });
      const totalCount = await Zone.countDocuments();
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      res.json({ zones: formatedZones, totalPages: totalPages });
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
      const zone = await Zone.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          zoneManager: await User.findOne({
            userName: req.body.zoneManager,
          }),
        },
        {
          new: true,
        }
      );
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
