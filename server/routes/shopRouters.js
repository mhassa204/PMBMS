const router = require("express").Router();
const shopController = require("../controllers/shopController");

//Shop routes
router.get("/shops", shopController.getAllShops); // Get all shops
router.get("/shop/:id", shopController.getShopByID); // Get shop by ID
router.post("/shop", shopController.createShop); // Create shop
router.patch("/shop/:id", shopController.editShopByID); // Edit shop by ID
router.delete("/shop/:id", shopController.deleteShopByID); // Delete shop by ID

//Shop category routes
router.post("/shop-categories", shopController.createShopCategory); // create shop category
router.get("/shop-categories/:id", shopController.getShopCategoryById); //get shop category by id
router.get("/shop-categories", shopController.getShopCategories); //get all shop categories
router.put("/shop-categories/:id", shopController.updateShopCategory); //update shop category
router.delete("/shop-categories/:id", shopController.deleteShopCategory); //delete a shop category

module.exports = router;
