const mongoose = require("mongoose");

const BazarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  areaUnit: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  dateOfEstablishment: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: String,
    enum: ["Active", "Inactive", "Disabled"],
  },
  totalShops: {
    type: Number,
    default: 0,
  },
  approvedShops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
    },
  ],

  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zones",
  },
  zoneManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  bazarManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  // image: {
  //   type: String,
  // },
});

const BazarModel = mongoose.model("bazars", BazarSchema);
module.exports = BazarModel;
