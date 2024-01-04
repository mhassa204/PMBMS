const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  district: {
    type: String,
    required: true,
  },
  city: [
    {
      type: String,
      required: true,
    },
  ],
  zoneManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const Zone = mongoose.model("zones", zoneSchema);

module.exports = Zone;
