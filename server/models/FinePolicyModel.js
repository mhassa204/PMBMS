const mongoose = require('mongoose');

const finePolicySchema = new mongoose.Schema({
    Amount: { type: Number, required: true },
    fineAfter15th: { type: Number, required: true },
    fineAfter25th: { type: Number, required: true },
});

const FinePolicy = mongoose.model('FinePolicy', finePolicySchema);

module.exports = FinePolicy;