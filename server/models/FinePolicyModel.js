const mongoose = require("mongoose");

const finePolicySchema = new mongoose.Schema({
  fineAfter10th: { type: Number, required: true },
  fineAfter15th: { type: Number, required: true },
  fineAfter25th: { type: Number, required: true },
  active: {
    type: String,
    enum: ["Active", "Inactive"],
  },
  bazar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bazars",
  },
  incomeCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "incomecategory",
  },
  dateModified: {
    type: Date,
    default: Date.now,
  },
});

const FinePolicy = mongoose.model("finepolicies", finePolicySchema);
module.exports = FinePolicy;
