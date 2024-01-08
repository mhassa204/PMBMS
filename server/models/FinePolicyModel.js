const mongoose = require("mongoose");

const finePolicySchema = new mongoose.Schema({
  fineAfter10th: { type: Number, required: true },
  fineAfter15th: { type: Number, required: true },
  fineAfter25th: { type: Number, required: true },
  active: {
    type: Boolean,
    default: false,
  },
  bazar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bazars",
  },
  incomeCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "incomecategory",
  },
});

const FinePolicy = mongoose.model("finepolicies", finePolicySchema);
module.exports = FinePolicy;
