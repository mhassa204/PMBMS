const express = require("express");
const router = express.Router();

// Import your controller modules
const bazarController = require("../controllers/bazarController");

// Define your routes
router.get("/:currentPage/:itemsPerPage", bazarController.getAllBazars);
// router.get("/bazar-shop", bazarController.getShopsInBazar);
router.get("/:id", bazarController.getBazarById);
router.post("/", bazarController.createBazar);
router.put("/:id", bazarController.updateBazar);
router.delete("/:id", bazarController.deleteBazar);

module.exports = router;
