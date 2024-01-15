const { Shop, ShopType, ShopCategory } = require("../models/ShopModel");
const BazarModel = require("../models/BazarModel");
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
    const currentPage = parseInt(req.params.currentPage) || 1;
    const itemsPerPage = parseInt(req.params.itemsPerPage) || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;
    try {
      const bazars = await BazarModel.find()
        // .populate({
        //   path: "zone",
        //   select: "zoneName",
        // })
        .populate([
          {
            path: "zone",
            select: "zoneName",
          },
          {
            path: "zoneManager",
            select: "userName",
          },
          {
            path: "bazarManager",
            select: "userName",
          },
          {
            path: "supervisor",
            select: "userName",
          },
        ])
        .skip(skip)
        .limit(limit);

      const transformedBazars = bazars.map((bazar) => ({
        name: bazar.name,
        address: bazar.address,
        active: bazar.active,
        area: bazar.area,
        areaUnit: bazar.areaUnit,
        dateOfEstablishment: bazar.dateOfEstablishment,
        totalShops: bazar.totalShops,
        prefix: bazar.prefix,
        totalShops: bazar.totalShops,
        bazarImage: bazar.bazarImage || "",
        city: bazar.city,
        bazarManager: bazar.bazarManager?.userName,
        zone: bazar.zone?.zoneName,
        zoneManager: bazar.zoneManager?.userName,
        supervisor: bazar.supervisor?.userName,
        id: bazar._id,
      }));
      const totalBazars = await BazarModel.countDocuments();
      const totalPages = Math.ceil(totalBazars / itemsPerPage);
      res
        .status(200)
        .json({ bazars: transformedBazars, totalBazars, totalPages });
    } catch (err) {
      res
        .status(500)
        .json({ message: "could not retrieve bazars", error: err });
    }
  },
];

exports.createBazar = async (req, res) => {
  const bazarData = req.body;
  const zone = await ZoneModel.findOne({ zoneName: bazarData.zone });
  const zoneManager = await User.findOne({ userName: bazarData.zoneManager });
  const bazarManager = await User.findOne({ userName: bazarData.bazarManager });
  const supervisor = await User.findOne({ userName: bazarData.supervisor });

  try {
    const bazar = await new BazarModel({
      name: bazarData.name,
      city: bazarData.city,
      prefix: bazarData.prefix,
      areaUnit: bazarData.areaUnit,
      area: bazarData.area,
      dateOfEstablishment: bazarData.dateOfEstablishment,
      active: bazarData.active,
      totalShops: bazarData.totalShops,
      address: bazarData.address,
      zone: zone._id,
      bazarManager: bazarManager._id,
      zoneManager: zoneManager._id,
      supervisor: supervisor._id,
    });
    if (
      !bazar.zone ||
      !bazar.bazarManager ||
      !bazar.zoneManager ||
      !bazar.supervisor
    ) {
      return res.status(404).json({ message: "Bazar not found" });
    }
    const newBazar = await bazar.save({ validateBeforeSave: false });

    const shopsInBazar = [];
    const shops = req.body.shops;

    const shop = shops.shops.map(async (shop) => {
      for (let i = 0; i < shop.totalShops; i++) {
        const newShop = await new Shop({
          shopID: `${bazar.prefix}-${shop.shopType}-${i + 1}`,
          shopName: `${bazar.prefix}-${shop.shopType}-${i + 1}`,
          shopType: await ShopType.findOne({ name: shop.shopType }),
          vacant: true,
          bazar: bazar._id,
          monthlyRent: shop.baseRent,
          shopLength: 0,
          shopWidth: 0,
        });
        const s = await newShop.save();
        shopsInBazar.push(s);
      }
      // }
    });
    await Promise.all(shop);
    newBazar.approvedShops.push(...shopsInBazar);
    await newBazar.save();
    res
      .status(201)
      .json({ message: "Bazar created successfully", bazar: bazar });
  } catch (error) {
    console.log("getting error bsdk");
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
