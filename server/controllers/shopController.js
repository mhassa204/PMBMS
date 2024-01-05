// Import required modules
const {
  Shop,
  ShopType,
  ShopCategory,
  IncomeCategory,
} = require("../models/ShopModel");
const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new shop
exports.createShop = async (req, res) => {
  try {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a shop by ID
exports.getShopByID = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit a shop by ID
exports.editShopByID = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a shop by ID
exports.deleteShopByID = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }
    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Shop categories controllers
//Create new shop category
exports.createShopCategory = [
  // verifyToken,
  // isSuperAdmin,
  async (req, res) => {
    const category = await ShopCategory.findOne({ name: req.body.name });
    if (category) {
      res.status(400).json({ message: "category already exist" });
    }
    try {
      const category1 = await new ShopCategory(req.body);
      res.status(200).json({
        message: "category created successfully!",
        category: category1,
      });
      console.log("hellow ahmad");
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not create category", error: err });
    }
  },
];

//get all shop categories
exports.getShopCategories = [
  // verifyToken,isSuperAdmin,
  async (req, res) => {
    try {
      const categories = await ShopCategory.find();
      res.status(200).json({
        message: "categories found successfully",
        categories: categories,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not find categories", error: err });
    }
  },
];

//get a shop category by id
exports.getShopCategoryById = [
  // verifyToken,isSuperAdmin,
  async (req, res) => {
    try {
      const category = await ShopCategory.findById(req.params.id);
      res
        .status(200)
        .json({ message: "category found successfully", category: category });
    } catch (err) {
      res.status(400).json({ message: "could not find category", error: err });
    }
  },
];

//delete a category by id
exports.deleteShopCategory = [
  // verifyToken,isSuperAdmin,
  async (req, res) => {
    try {
      const category = await ShopCategory.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ message: "category deleted successfully", category: category });
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not delete category", error: err });
    }
  },
];

//update a category by id
exports.updateShopCategory = [
  // verifyToken,isSuperAdmin,
  async (req, res) => {
    try {
      const category = await ShopCategory.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "category updated successfully", category: category });
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not update category", error: err });
    }
  },
];

//shop type controllers
//get all the shop types
exports.getShopTypes = [
  // verifyToken,isSuperAdmin,
  async (req, res) => {},
];
