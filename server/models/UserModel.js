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
  mobileNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["disabled", "inactive", "active"],
    default: "inactive",
  },
  userType: {
    type: String,
    enum: ["SuperAdmin", "Admin", "ZoneManager", "BazarManager", "Supervisor"],
    required: true,
  },
});

const User = mongoose.model("users", userModel);

module.exports = User;
