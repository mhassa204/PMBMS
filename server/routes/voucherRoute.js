const express = require("express");
const router = express.Router();
const VoucherController = require("../controllers/voucherController");

router.get("/", VoucherController.getAllVouchers); // Get all vouchers
router.get("/:id", VoucherController.getVoucherByID); // Get a single voucher by ID
router.post("/", VoucherController.createVoucher); // Create a new voucher
router.put("/:id", VoucherController.updateVoucher); // Update a voucher
router.delete("/:id", VoucherController.deleteVoucher); // Delete a voucher
