const { ShopCategory, ShopType } = require("../models/ShopModel");
const ZoneModel = require("../models/ZoneModel");
const UserModel = require("../models/UserModel");
const IncomeCategory = require("../models/IncomeCategoryModel");
const BazarModel = require("../models/BazarModel");
const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");

// Get all shop categories,types,user
exports.getAllData = [
  verifyToken,
  async (req, res) => {
    try {
      const shopCategories = await ShopCategory.find();
      const shopTypes = await ShopType.find();
      const zones = await ZoneModel.find()
        .populate({
          path: "zoneManager",
          select: "userName",
        })
        .select("zoneName zoneManager");
      const users = await UserModel.find({
        userType: { $ne: "SuperAdmin" },
      }).select("userName userType");
      const incomeCategories = await IncomeCategory.find();
      res.json({
        shopCategories: shopCategories,
        shopTypes: shopTypes,
        zones: zones,
        users: users,
        incomeCategories: incomeCategories,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Get all zones and bazars
exports.getZoneBazars = [
  verifyToken,
  async (req, res) => {
    try {
      const zones = await ZoneModel.find().select("zoneName");
      const bazars = await BazarModel.find().populate({
        path: "zone",
        select: "zoneName",
      });
      if (!zones || !bazars) {
        res.status(400).json({
          message: "zones or bazars not found",
        });
      }
      const specificBazarField = bazars.map((bazar) => {
        return {
          bazarName: bazar.name,
          zoneName: bazar.zone.zoneName,
          bazarId: bazar._id,
          zoneId: bazar.zone._id,
        };
      });
      res.json({
        zones: zones,
        bazars: specificBazarField,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
