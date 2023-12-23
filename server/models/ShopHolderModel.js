const mongoose = require('mongoose');

const shopHolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'non active'],
        required: true
    },
    fatherName: {
        type: String
    },
    DOB: {
        type: Date
    },
    cnic: {
        type: String,
        required: true
    },
    cnicExpiry: {
        type: Date
    },
    gender: {
        type: String
    },
    holderStatus: {
        type: String,
        enum: ['perm add', 'temp add']
    },
    contactNumber: {
        type: String
    },
    secondaryContactNumber: {
        type: String
    },
    email: {
        type: String
    },
    profession: {
        type: String
    },
    opp_refrence: {
        type: String
    },
    remarks: {
        type: String
    },
    referredBy: {
        type: String
    },
    blacklist: {
        type: Boolean
    },
    cnicFront: {
        type: String
    },
    cnicBack: {
        type: String
    },
    picture: {
        type: String
    },
    thumbImpression: {
        type: String
    }
});

const ShopHolder = mongoose.model('ShopHolder', shopHolderSchema);

module.exports = ShopHolder;
