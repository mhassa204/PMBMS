const express = require("express");
const router = express.Router();

const {
    assignShop,
    approveShopAllotment,
    rejectShopAllotment,
    getAllShopAllotments,
    getShopAllotmentByID,
    editShopAllotmentByID,
    deleteShopAllotmentByID,
} = require("../controllers/shopAllotmentController");

router.get("/", getAllShopAllotments);

router.get("/:id", getShopAllotmentByID);

router.put("/:id", editShopAllotmentByID);

router.delete("/:id", deleteShopAllotmentByID);

router.post("/assign-shop", assignShop);

router.post("/approve-shop-allotment", approveShopAllotment);

router.post("/reject-shop-allotment", rejectShopAllotment);

module.exports = router;
