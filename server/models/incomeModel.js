
const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    income: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    incomeCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IncomeCategory',
        required: true
    },
});

const IncomeModel = mongoose.model('IncomeModel', incomeSchema);

module.exports = IncomeModel;
