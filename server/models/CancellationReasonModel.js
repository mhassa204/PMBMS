const mongoose = require("mongoose");

const CancellationReasonSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "cancellationreasons",
  CancellationReasonSchema
);
