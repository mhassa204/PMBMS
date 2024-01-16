const router = require("express").Router();
const shopController = require("../controllers/shopController");

//Shop routes
router.get("/shops/:currentPage/:itemsPerPage", shopController.getAllShops); // Get all shops
router.get("/shop/:id", shopController.getShopByID); // Get shop by ID
router.post("/shop", shopController.createShop); // Create shop
router.put("/shop/:id", shopController.editShopByID); // Edit shop by ID
router.delete("/shop/:id/:bazarId", shopController.deleteShopByID); // Delete shop by ID

//Shop category routes
router.get("/shop-categories", shopController.getSimpleShopCategory); // get simple shop category
router.post("/shop-categories", shopController.createShopCategory); // create shop category
router.get("/shop-categories/:id", shopController.getShopCategoryById); //get shop category by id
router.get(
  "/shop-categories/:currentPage/:itemsPerPage",
  shopController.getShopCategories
); //get all shop categories
router.put("/shop-categories/:id", shopController.updateShopCategory); //update shop category
router.delete("/shop-categories/:id", shopController.deleteShopCategory); //delete a shop category

//Shop type routes
// router.get("/shop-types", shopController.getSimpleShopType); // get simple shop type
router.post("/shop-types", shopController.createShopType); // create shop type
router.get("/shop-types/:id", shopController.getShopTypeById); //get shop type by id
router.get(
  "/shop-types/:currentPage/:itemsPerPage",
  shopController.getShopTypes
); //get all shop type
router.put("/shop-types/:id", shopController.updateShopTypeById); //update shop type
router.delete("/shop-types/:id", shopController.deleteShopTypeById); //delete a shop type

module.exports = router;
