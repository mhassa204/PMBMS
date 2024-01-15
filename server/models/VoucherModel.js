const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  voucher_ID: { type: String, required: true, unique: true },
  stall: { type: mongoose.Schema.Types.ObjectId, ref: "shops", required: true },
  shopHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shopholders",
    required: true,
  },
  incomeCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "incomecategories",
  },
  shopType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shoptypes",
  },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  lateFine: { type: Number, required: true },
  voucherForMonth: { type: Date, required: true },
  dateGenerated: { type: Date, default: Date.now },
  paidAmount: {
    type: Number,
    default: 0,
  },
  paidDate: {
    type: Date,
  },
  bankVoucherNumber: {
    type: String,
  },
  status: {
    type: String,
    enum: ["redeemed", "not_redeemed"],
    default: "not_redeemed",
  },
});

const Voucher = mongoose.model("vouchers", voucherSchema);
module.exports = Voucher;
