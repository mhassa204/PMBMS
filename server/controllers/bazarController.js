const BazarModel = require("../models/BazarModel");
const { Shop, ShopType, ShopCategory } = require("../models/ShopModel");
// const asyncHandler = require("express-async-handler");
const ZoneModel = require("../models/ZoneModel");
const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");
const User = require("../models/UserModel");
const Zone = require("../models/ZoneModel");

// Controller functions

// Get all bazars
exports.getAllBazars = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const bazars = await BazarModel.find()
        .populate({
          path: "zones",
          select: "name",
        })
        .populate({
          path: "users",
          select: "name",
        });
      res.status(200).json(bazars);
    } catch (err) {
      res
        .status(500)
        .json({ message: "could not retrieve bazars", error: err });
    }
  },
];

exports.createBazar = async (req, res) => {
  const bazarData = req.body;

  // shops={
  //   approvedShops:100,
  //   shops: [
  //     {
  //       shopType:"outlet",
  //       noOfShops:20,
  //       baseRent:4000
  //     }
  //   ]
  // }

  // Create Bazar instance
  try {
    const bazar = new BazarModel({
      ...bazarData,
      zone: await ZoneModel.findOne({ zoneName: bazarData.zone }),
      bazarManager: await User.findOne({ userName: bazarData.bazarManager }),
      zoneManager: await User.findOne({ userName: bazarData.zoneManager }),
      supervisor: await User.findOne({ userName: bazarData.supervisor }),
    });

    // Create and save shops based on the provided Shop Types
    const shops = req.body.shops;
    shops.shops.map(async (shop) => {
      for (let i = 0; i < noOfShops; i++) {
        const newShop = await new Shop({
          shopID: `${bazar.prefix}-${shop.shopType}-${i + 1}`,
          shopName: `${bazar.prefix}-${shop.shopType}-${i + 1}`,
          shopType: await ShopType.findOne({ name: shop.shopType }),
          vacant: true,
          bazar: bazar._id,
          monthlyRent: shop.monthlyRent,
          shopLength: 0,
          shopWidth: 0,
        });
        await newShop.save();
      }
    });
    const newBazar = await bazar.save();
    res
      .status(201)
      .json({ message: "Bazar created successfully", bazar: newBazar });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Get a single bazar
exports.getBazarById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const bazar = await BazarModel.findById(req.params.id)
        .populate({
          path: "zones",
          select: "name",
        })
        .populate({
          path: "shops",
        })
        .populate({
          path: "users",
          select: "name",
        });
      if (bazar) {
        res
          .status(200)
          .json({ message: "bazar retrieved successfully", bazar: bazar });
      } else {
        res.status(404).json({ message: "bazar not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "internal server error" });
    }
  },
];

// Update a bazar
exports.updateBazar = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const bazar = await BazarModel.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          bazarManager: await User.findOne({ userName: req.body.bazarManager }),
          zoneManager: await User.findOne({ userName: req.body.zoneManager }),
          zone: await Zone.findOne({ zoneName: req.body.zoneName }),
          supervisor: await User.findOne({ userName: req.body.supervisor }),
        },
        {
          new: true,
        }
      );
      if (bazar) {
        res.json({ message: "bazar updated successfully", bazar: bazar });
      } else {
        res.status(404).json({ message: "Bazar not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "internal server error" });
    }
  },
];

// Delete a bazar
exports.deleteBazar = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const bazar = await BazarModel.findById(req.params.id);
      if (bazar) {
        for (let shop in bazar.approvedShops) {
          const shops = await Shop.findByIdAndDelete(shop);
        }
        bazar.remove();
        res.status(200).json({ message: "Bazar deleted successfully" });
      } else {
        res.status(404).json({ message: "Bazar not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "internal server error" });
    }
  },
];

//Get shops in bazar
// exports.getShopsInBazar = [
//   verifyToken,
//   isSuperAdmin,
//   async (req, res) => {
//     try {
//       const bazar = await BazarModel.findById(req.params.id).populate({
//         path: "shops",
//       });
//       if (!bazar || !bazar.shops.length) {
//         return res.status(404).json({ message: "No Shop Found!" });
//       } else {
//         res
//           .status(200)
//           .json({ message: "Shops not found in bazar", shops: bazar.shops });
//       }
//     } catch (err) {
//       res
//         .status(500)
//         .json({ message: `Error getting the data from the database ${err}` });
//     }
//   },
// ];
