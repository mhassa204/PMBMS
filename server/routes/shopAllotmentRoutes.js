const express = require("express");
const router = express.Router();
const shopAllotmentController = require("../controllers/shopAllotmentController");

router.get("/", shopAllotmentController.getAllShopAllotments);
router.get("/:id", shopAllotmentController.getShopAllotmentByID);
router.put("/:id", shopAllotmentController.editShopAllotmentByID);
router.delete("/:id", shopAllotmentController.deleteShopAllotmentByID);
router.post("/assign-shop", shopAllotmentController.assignShop);
router.post("/approve-allotment", shopAllotmentController.approveShopAllotment);
router.post("/reject-allotment", shopAllotmentController.rejectShopAllotment);

module.exports = router;
