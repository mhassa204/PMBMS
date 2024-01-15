const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Inactive", "Active"],
    default: "Inactive",
  },
  userType: {
    type: String,
    enum: ["SuperAdmin", "Admin", "ZoneManager", "BazarManager", "Supervisor"],
    required: true,
  },
});

const User = mongoose.model("users", userModel);

module.exports = User;
