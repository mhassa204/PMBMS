const mongoose = require('mongoose');


const incomeCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const IncomeCategory = mongoose.model('IncomeCategory', incomeCategorySchema);
