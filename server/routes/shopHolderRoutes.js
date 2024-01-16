const rotuer = require("express").Router();
const shopHolderController = require("../controllers/shopHolderController");

rotuer.get(
  "/:currentPage/:itemsPerPage",
  shopHolderController.getAllShopHolders
); // Get all shop holders
rotuer.get("/:id", shopHolderController.getShopHolderById); // Get shop holder by ID
rotuer.post("/", shopHolderController.createShopHolder); // Create shop holder
rotuer.patch("/:id", shopHolderController.updateShopHolder); // Edit shop holder by ID
rotuer.delete("/:id", shopHolderController.deleteShopHolder); // Delete shop holder by ID

module.exports = rotuer;
