const mongoose = require("mongoose");

const incomeCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const IncomeCategory = mongoose.model("incomecategories", incomeCategorySchema);
module.exports = IncomeCategory;
