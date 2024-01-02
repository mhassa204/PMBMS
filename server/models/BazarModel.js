const mongoose = require('mongoose');

const BazarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'City'
    },
    zone: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Zone'
    },

    active: {
        type: Boolean,
        default: false
    },
    //we can use this to store the shops in the bazar
    //we only need StoreType to create a shop in bazar form
    approvedShops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }],
    baseRentPermanent: {
        type: Number,
        required: true
    },
    prefix: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    zoneManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bazarManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const BazarModel = mongoose.model('Bazar', BazarSchema);

module.exports = BazarModel;
