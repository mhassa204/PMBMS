const mongoose = require("mongoose");

const shopHolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
  },
  email: {
    type: String,
  },
  DOB: {
    type: Date,
  },
  cnic: {
    type: String,
    required: true,
  },
  cnicExpiry: {
    type: Date,
  },
  gender: {
    type: String,
  },
  //   holderStatus: {
  //     type: String,
  //     enum: ["Permanent", "Temporary"],
  //   },
  contactNumber: {
    type: String,
  },
  secondaryContactNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  secondaryAddress: {
    type: String,
  },
  profession: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "Not Active", "Disabled"],
    required: true,
  },
  applicationReference: {
    type: String,
  },
  remarks: {
    type: String,
  },
  referredBy: {
    type: String,
  },
  blacklist: {
    type: String,
    enum: ["True", "False"],
  },
  cnicFront: {
    type: String,
  },
  cnicBack: {
    type: String,
  },
  picture: {
    type: String,
  },
  biometricImage: {
    type: String,
  },
});

const ShopHolder = mongoose.model("shopholders", shopHolderSchema);

module.exports = ShopHolder;
