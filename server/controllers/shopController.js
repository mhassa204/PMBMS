// Import required modules
const {
  Shop,
  ShopType,
  ShopCategory,
  IncomeCategory,
} = require("../models/ShopModel");
const BazarModel = require("../models/BazarModel");
const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin } = require("../middleware/roles");

// Get all shops -done
exports.getAllShops = async (req, res) => {
  try {
    const currentPage = parseInt(req.params.currentPage);
    const itemsPerPage = parseInt(req.params.itemsPerPage);
    const shops = await Shop.find()
      .populate([
        {
          path: "shopType",
          select: "name",
        },
        {
          path: "shopCategory",
          select: "name",
        },
        {
          path: "bazar",
          select: "name",
        },
      ])
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);
    const totalItems = await Shop.countDocuments();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (!shops) return res.status(400).json("No shops found");
    res.status(200).json({
      message: "shops retrieved successfully",
      shops: shops,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new shop -done
exports.createShop = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      let bazar = await BazarModel.findById(req.body.bazar);
      const body = req.body;
      const randomNumber = Math.floor(100 + Math.random() * 900);
      const shopID =
        bazar.name.substring(0, 4) +
        body.shopName.substring(0, 3) +
        randomNumber;

      const shop = new Shop({
        ...req.body,
        shopID: shopID,
      });
      console.log("shop is: ", shop);
      const result = await shop.save();
      res.status(201).json({
        message: "New shop created Successfully!",
        shop: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

// Get a shop by ID
exports.getShopByID = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shop = await Shop.findById(req.params.id);
      if (!shop) {
        return res.status(404).json({ error: "Shop not found" });
      }
      res.status(201).json({ message: "shop found successfully", shop: shop });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

// Edit a shop by ID -done
exports.editShopByID = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shop = await Shop.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        {
          new: true,
        }
      );

      if (!shop) {
        return res.status(404).json({ error: "Shop not found" });
      }
      res.json({ message: "shop updated successfully", shop: shop });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

// Delete a shop by ID -done
exports.deleteShopByID = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shop = await Shop.findByIdAndDelete(req.params.id);
      if (!shop) {
        return res.status(404).json({ error: "Shop not found" });
      }
      if (shop) {
        let bazar = await BazarModel.findById(req.params.bazarId);
        bazar.approvedShops = bazar.approvedShops.filter((shop) => {
          return String(shop._id) !== String(req.params.id);
        });
        await bazar.save();
        res.status(200).json({ message: "Shop deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

//--------------------------------------------------
//Shop categories controllers
//Create new shop category -done
exports.createShopCategory = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    const category = await ShopCategory.findOne({
      name: req.body.name,
    });
    if (category) {
      return res.status(400).json({ message: "category already exists" });
    } else {
      try {
        const category1 = await new ShopCategory(req.body);
        const savedCategory = await category1.save();
        return res.status(200).json({
          message: "category created successfully!",
          category: savedCategory,
        });
      } catch (err) {
        return res
          .status(400)
          .json({ message: "could not create category", error: err });
      }
    }
  },
];

//Get all shop categories -done
exports.getSimpleShopCategory = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const categories = await ShopCategory.find();
      res.status(200).json({
        message: "categories retrieved successfully",
        categories: categories,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not find categories", error: err });
    }
  },
];

//get all shop categories paginated -done
exports.getShopCategories = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const currentPage = parseInt(req.params.currentPage);
      const itemsPerPage = parseInt(req.params.itemsPerPage);
      const categories = await ShopCategory.find()
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const totalItems = await ShopCategory.countDocuments();
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (!categories) return res.status(400).json("No categories found");
      res.status(200).json({
        message: "categories retrieved successfully",
        categories: categories,
        totalItems: totalItems,
        totalPages: totalPages,
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
  verifyToken,
  isSuperAdmin,
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

//delete a category by id -done
exports.deleteShopCategory = [
  verifyToken,
  isSuperAdmin,
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

//update a category by id -done
exports.updateShopCategory = [
  verifyToken,
  isSuperAdmin,
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

//--------------------------------------------------
//shop type controllers
//post a shop type -done
exports.createShopType = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shopType = await ShopType.findOne({ name: req.body.name });
      if (shopType) {
        res.status(400).json({ message: "shop type already exist" });
      } else {
        const shopType = new ShopType(req.body);
        const savedShopType = shopType.save();
        res.status(200).json({
          message: "shop type created successfully",
          shopType: savedShopType,
        });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not create shop type", error: err });
    }
  },
];

//get all the shop types -done
exports.getShopTypes = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const currentPage = parseInt(req.params.currentPage);
      const itemsPerPage = parseInt(req.params.itemsPerPage);
      const shopTypes = await ShopType.find()
        .skip((currentPage - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const totalItems = await ShopType.countDocuments();
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      if (!shopTypes) return res.status(400).json("No shop types found");

      res.status(200).json({
        message: "shop types retrieved successfully",
        shopTypes: shopTypes,
        totalItems: totalItems,
        totalPages: totalPages,
      });
    } catch (err) {
      res.status(400).json({ message: "could not get shop types", error: err });
    }
  },
];

//get a shop type by id
exports.getShopTypeById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shopType = await ShopType.findById(req.params.id);
      if (shopType) {
        res
          .status(200)
          .json({ message: "found shop type succesfully", shopType: shopType });
      }
    } catch (err) {
      res.status(400).json({ message: "could not find shop type", error: err });
    }
  },
];

//update a shop type by id -done
exports.updateShopTypeById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    console.log("updating shop type: ", req.body, req.params);
    try {
      const shopType = await ShopType.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (shopType) {
        res.status(200).json({
          message: "shop type updated succesfully",
          shopType: shopType,
        });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not update shop type", error: err });
    }
  },
];

//delete a shop type by id -done
exports.deleteShopTypeById = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const shopType = await ShopType.findByIdAndDelete(req.params.id);
      if (shopType) {
        res.status(200).json({
          message: "shop type deleted succesfully",
          shopType: shopType,
        });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: "could not delete shop type", error: err });
    }
  },
];
