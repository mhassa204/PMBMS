const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  Voucher_ID: { type: String, required: true, unique: true },
  stall: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  shopHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopHolder",
    required: true,
  },
  Amount: { type: Number, required: true },
  DueDate: { type: Date, required: true },
  LateFine: { type: Number, required: true },
  VoucherForMonth: { type: Date, required: true },
  DateGenerated: { type: Date, default: Date.now },
  Status: {
    type: String,
    enum: ["redeemed", "not_redeemed"],
    default: "not_redeemed",
  },
});

const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
