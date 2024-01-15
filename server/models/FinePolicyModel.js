const mongoose = require("mongoose");

const finePolicySchema = new mongoose.Schema({
  fineName: {
    type: String,
    required: true,
  },
  fineAfter10th: { type: Number, required: true },
  fineAfter20th: { type: Number, required: true },
  fineAfter25th: { type: Number, required: true },
  active: {
    type: String,
    enum: ["Active", "Inactive"],
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zones",
  },
  bazar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bazars",
  },
  incomeCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "incomecategories",
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
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const FinePolicy = mongoose.model("finepolicies", finePolicySchema);
module.exports = FinePolicy;
