const mongoose = require('mongoose');

// Define Shop Category Schema
const shopCategorySchema = new mongoose.Schema({
    edible: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// Define Shop Type Schema
const shopTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
// Define Income Category Schema

// Define Shop Schema
const shopSchema = new mongoose.Schema({
    shopID: {
        type: String,
        required: true
    },
    shopCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopCategory',
    },
    shopType: {
        type: String,
        required: true
    },
    vacant : {
        type: Boolean,
        default: true
    },
    bazar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bazar',
        required: true
    },
    size: {
        type: String,
        required: true
    },
});

// Define models
const ShopCategory = mongoose.model('ShopCategory', shopCategorySchema);
const ShopType = mongoose.model('ShopType', shopTypeSchema);
const Shop = mongoose.model('Shop', shopSchema);

module.exports = {
    ShopCategory,
    ShopType,
    Shop
};
ShopCategory