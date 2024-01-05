const BazarModel = require("../models/BazarModel");
const { Shop, ShopType } = require("../models/ShopModel");
// const asyncHandler = require("express-async-handler");
const ZoneModel = require("../models/ZoneModel");
const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");

// Controller functions

// Get all bazars
exports.getAllBazars = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const bazars = await BazarModel.find();
    res.status(200).json(bazars);
  },
];

exports.createBazar = async (req, res) => {
  const bazarData = req.body;
  const zone1 = await ZoneModel.findOne({ name: bazarData.zone });

  // console.log(zone1);

  // Create Bazar instance
  const bazar = new BazarModel({
    ...bazarData,
    zone: zone1._id,
  });
  const newBazar = await bazar.save();

  // Create and save shops based on the provided Shop Types
  const totalApprovedShops = bazarData.approvedShops;

  const shopTypesArray = Object.keys(shopTypes);
  let counter = 0;
  for (const shopTypeName of shopTypesArray) {
    const shopTypeCount = shopTypes[shopTypeName];
    for (let i = 0; i < shopTypeCount; i++) {
      const shop = new Shop({
        // shopID: `${city1.prefix}-${zone1.name}-${newBazar.prefix}-${shopTypeName}-${counter}`,
        shopType: shopTypeName, // Get the ShopType ObjectId based on the name
        bazar: newBazar._id,
        size: "default", // Set the default size or modify as needed
      });
      counter++;
      await shop.save();
      newBazar.approvedShops.push(shop._id); // Add the shop to the approvedShops array in Bazar
    }
  }

  // Save the updated Bazar with the created shops
  await newBazar.save();

  res.status(201).json(newBazar);
};

// Get a single bazar
exports.getBazarById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const bazar = await BazarModel.findById(req.params.id);
    if (bazar) {
      res.status(200).json(bazar);
    } else {
      res.status(404).json({ message: "Bazar not found" });
    }
  },
];

// Update a bazar
exports.updateBazar = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const bazar = await BazarModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (bazar) {
      res.json(bazar);
    } else {
      res.status(404).json({ message: "Bazar not found" });
    }
  },
];

// Delete a bazar
exports.deleteBazar = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const bazar = await BazarModel.findByIdAndDelete(req.params.id);
    if (bazar) {
      res.status(200).json({ message: "Bazar deleted successfully" });
    } else {
      res.status(404).json({ message: "Bazar not found" });
    }
  },
];
