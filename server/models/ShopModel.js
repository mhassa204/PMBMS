const mongoose = require("mongoose");

// Define Shop Category Schema
const shopCategorySchema = new mongoose.Schema({
  editable: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Define Shop Type Schema
const shopTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
// Define Income Category Schema

// Define Shop Schema
const shopSchema = new mongoose.Schema({
  shopID: {
    type: String,
    required: true,
  },
  shopCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shopcategories",
  },
  shopType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shoptypes",
  },
  vacant: {
    type: Boolean,
    default: true,
  },
  bazar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bazars",
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  monthlyRent: {
    type: Number,
    required: true,
  },
});

// Define models
const ShopCategory = mongoose.model("shopcategories", shopCategorySchema);
const ShopType = mongoose.model("shoptypes", shopTypeSchema);
const Shop = mongoose.model("shops", shopSchema);

module.exports = {
  ShopCategory,
  ShopType,
  Shop,
};
