const mongoose = require('mongoose');

const waiverPolicySchema = new mongoose.Schema({
    WaiverPolicy_ID: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Amount: { type: Number, required: true }
});

const WaiverPolicy = mongoose.model('WaiverPolicy', waiverPolicySchema);

module.exports = WaiverPolicy;