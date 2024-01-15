const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  zoneName: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  zoneDistrict: {
    type: String,
    required: true,
  },
  citiesInZone: [
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
  active: {
    type: String,
    enum: ["Active", "Inactive"],
  },
});

const Zone = mongoose.model("zones", zoneSchema);

module.exports = Zone;
