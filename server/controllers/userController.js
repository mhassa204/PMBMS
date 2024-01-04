const User = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/accessAuth");
const { isSuperAdmin, isAdmin } = require("../middleware/roles");

exports.login = async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user)
    return res
      .status(401)
      .send({ auth: false, token: null, message: "User not found" });
  let passwordIsValid = bcryptjs.compare(req.body.password, user.password);
  if (!passwordIsValid)
    return res
      .status(401)
      .send({ auth: false, token: null, message: "Password is not valid" });
  let token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

  if (user && token && passwordIsValid) {
    res.status(200).json({ token: token, user: user, auth: true });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
// Get all users
exports.getUsers = [
  verifyToken,
  async (req, res) => {
    const currentPage = req.params.currentPage || 1;
    const itemsPerPage = req.params.itemsPerPage || 10;
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = parseInt(itemsPerPage);
    try {
      const users = await User.find().skip(skip).limit(limit);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
// Get a user by ID
exports.getUserById = [
  verifyToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json({ user: user, message: "User found successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Add a new user
exports.addUser = [
  // verifyToken,
  async (req, res) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    try {
      const user = new User({ ...req.body, password: hashedPassword });
      console.log("user is: ", user);
      // const user = new User({
      //   userName: req.body.username,
      //   email: req.body.email,
      //   password: hashedPassword,
      //   city: req.body.city,
      //   mobileNumber: req.body.mobile,
      //   userType: req.body.userType,
      //   status: req.body.status,
      // });
      // const newUser = await user.save();
      res
        .status(201)
        .json({ user: user, message: "user registered successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Delete a user
exports.deleteUser = [
  verifyToken,
  isSuperAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (user) {
        await user.remove();
        res.json({ message: "User deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Update a user
exports.updateUser = [
  verifyToken,
  async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (req.body.password) {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        user.password = hashedPassword;
      }
      await user.save();
      res.json({ user: user, message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];
