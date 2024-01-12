const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  bazar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bazars",
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shops",
  },
  shopHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shopholders",
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["disabled", "inactive", "active"],
    default: "inactive",
  },
  userType: {
    type: String,
    enum: ["SuperAdmin", "Admin", "ZoneManager", "BazarManager", "Supervisor"],
    required: true,
  },
});
