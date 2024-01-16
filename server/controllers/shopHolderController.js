const ShopHolder = require("../models/ShopHolderModel");
const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");

//Get all shopHolders
exports.getAllShopHolders = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const currentPage = req.body.currentPage || 1;
    const itemsPerPage = req.body.itemsPerPage || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;
    try {
      const shopHolders = await ShopHolder.find().skip(skip).limit(limit);
      const totalCount = await ShopHolder.countDocuments();
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      res.status(200).json({
        message: "shop holders retrieved successfully",
        shopHolders: shopHolders,
        totalPages: totalPages,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "could not retrieve shop holders", error: error });
    }
  },
];

//Create a new shopHolder
exports.createShopHolder = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const shopHolder = new ShopHolder(req.body);
    try {
      const newShopHolder = await shopHolder.save();
      res.status(201).json({
        message: "shop holder created successfully",
        shopHolder: newShopHolder,
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "could not create shop holder", error: error });
    }
  },
];

//Get a single shopHolder
exports.getShopHolderById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shopHolder = await ShopHolder.findById(req.params.id);
      if (shopHolder) {
        res.json({
          message: "shop holder retrieved successfully",
          shopHolder: shopHolder,
        });
      } else {
        res.status(404).json({ message: "ShopHolder not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "could not retrieve shop holder",
        error: error,
      });
    }
  },
];

//Update a shopHolder
exports.updateShopHolder = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shopHoler = await ShopHolder.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (shopHoler) {
        res.json({
          message: "shop holder updated successfully",
          shopHolder: shopHoler,
        });
      } else {
        res.status(404).json({ message: "ShopHolder not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "could not update shop holder",
        error: error,
      });
    }
  },
];

//Delete a shopHolder
exports.deleteShopHolder = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shopHolder = await ShopHolder.findById(req.params.id);
      if (shopHolder) {
        await shopHolder.remove();
        res.status(200).json({ message: "ShopHolder deleted" });
      } else {
        res.status(404).json({ message: "ShopHolder not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "could not delete shop holder",
        error: error,
      });
    }
  },
];
