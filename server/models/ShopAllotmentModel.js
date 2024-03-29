const mongoose = require("mongoose");

const shopAllotmentSchema = new mongoose.Schema({
  allotmentDate: { type: Date, default: Date.now },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "shops", required: true },
  shopholder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shopholders",
    required: true,
  },
  voucher: { type: mongoose.Schema.Types.ObjectId, ref: "vouchers" },
  status: {
    type: String,
    enum: ["Pending", "Active", "Rejected"],
    default: "Pending",
  },
  securityPaid: {
    type: Boolean,
    default: false,
  },
  securityPaidDate: {
    type: Date,
  },
  securityAmount: {
    type: Number,
    default: 0,
  },
  // securityPaidVoucher: {
  //   type: String,
  // },
  agreementDocs: [
    {
      type: String,
    },
  ],
  agreementDate: {
    type: Date,
  },
  agreementExpiry: {
    type: Date,
  },
});

const ShopAllotment = mongoose.model("shopallotments", shopAllotmentSchema);
module.exports = ShopAllotment;
