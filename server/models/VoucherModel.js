const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  voucherId: { type: String, required: true, unique: true },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zones",
  },
  bazar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bazars",
  },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "shops", required: true },
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
  month: {
    type: String,
    required: true,
  },
  amount: { type: Number, required: true },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: { type: Date, required: true },
  lateFine: { type: Number, required: true },
  dateGenerated: { type: Date, default: Date.now },
  waiverAmount: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
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
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  modifyDate: {
    type: Date,
    default: Date.now,
  },
  modifyBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Voucher = mongoose.model("vouchers", voucherSchema);
module.exports = Voucher;
