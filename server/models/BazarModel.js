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
  // shopsInfo: {
  //   approvedShops: {
  //     type: Number,
  //     default: 0,
  //   },
  //   shops: [
  //     {
  //       totalShops: {
  //         type: Number,
  //         default: 0,
  //       },
  //       shopType: {
  //         type: String,
  //         required: true,
  //       },
  //       baseRent: {
  //         type: Number,
  //         required: true,
  //       },
  //     },
  //   ],
  // },
  dateOfEstablishment: {
    type: Date,
    default: Date.now(),
  },
  height: {
    type: Number,
  },
  width: {
    type: Number,
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "zones",
  },
  //we can use this to store the shops in the bazar
  //we only need StoreType to create a shop in bazar form
  approvedShops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
    },
  ],
  prefix: {
    type: String,
    required: true,
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
  // shops: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "shops",
  //   },
  // ],
  active: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
  },
});

const BazarModel = mongoose.model("bazars", BazarSchema);
module.exports = BazarModel;
