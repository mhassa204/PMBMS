const mongoose = require("mongoose");

const shopAllotmentSchema = new mongoose.Schema({
  TxID: { type: String, required: true, unique: true },
  AllotmentDate: { type: Date, default: Date.now },
  Shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  monthlyRent: { type: Number, required: true },
  shopholder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShopHolder",
    required: true,
  }, // Assuming there is a 'ShopHolder' model
  voucher: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" },
  Status: {
    type: String,
    enum: ["Pending", "Active" ,"Rejected"],
    default: "Pending",
  },
  securityPaid: {
    type: Boolean,
    default: false,
  },
  securityPaidDate: {
    type: Date,
  },
  securityPaidAmount: {
    type: Number,
    default: 0,
  },
  securityPaidTxID: {
    type: String,
  },
  Agreement: {
    type: String,
  },
  AgreementDate: {
    type: Date,
  },
  AgreementExpiry: {
    type: Date,
  },

  }
);


const ShopAllotment = mongoose.model("ShopAllotment", shopAllotmentSchema);

module.exports = ShopAllotment;
