const express = require("express");
const router = express.Router();
const zoneController = require("../controllers/zoneController");

// router.get("/zone", zoneController.getZoneNames);
router.get("/:currentPage/:itemsPerPage", zoneController.getZones);
router.get("/:id", zoneController.getZoneById);
router.post("/", zoneController.createZone);
router.delete("/:id", zoneController.deleteZoneById);
router.put("/:id", zoneController.updateZoneById);

module.exports = router;
