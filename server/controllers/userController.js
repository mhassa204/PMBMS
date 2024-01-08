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
  const token = jwt.sign(
    { id: user._id, userRole: user.userType },
    process.env.JWT_TOKEN,
    {
      expiresIn: "7d",
      // expiresIn: 10000, //86400=24h,
    }
  );
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
      const totalCount = await User.countDocuments();
      const totalPages = Math.ceil(totalCount / itemsPerPage);
      res.json({ users: users, totalPages: totalPages });
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
// exports.addUser = [
//   // verifyToken,
//   async (req, res) => {
//     const u = req.body;
//     console.log("user is: ", u);

//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(req.body.password, salt);
//     console.log("Creating a user.");

//     try {
//       const user = new User({
//         userName: req.body.userName,
//         email: req.body.email,
//         password: hashedPassword,
//         city: req.body.city,
//         mobileNumber: req.body.mobileNumber,
//         userType: req.body.userType,
//         status: req.body.status,
//       });
//       const newUser = await user.save();
//       console.log("Created user: ", newUser);

//       res
//         .status(201)
//         .json({ user: newUser, message: "user registered successfully" });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   },
// ];

exports.addUser = [
  // verifyToken, // Uncomment this line if you have a verifyToken middleware

  async (req, res) => {
    // Store req.body in a variable for better readability
    const u = req.body;
    //check if user already exist
    let userExist = await User.findOne({ email: u.email });
    if (userExist) {
      console.log("user exists already");
      res.status(400).json({ message: "Email already exist!" });
    } else {
      try {
        // Generate a salt and hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(u.password, salt);

        // Create a new user using the User model
        const user = new User({
          userName: u.userName,
          email: u.email,
          password: hashedPassword,
          city: u.city,
          mobileNumber: u.mobileNumber,
          userType: u.userType,
          status: u.status,
        });

        // Save the new user to the database
        const newUser = await user.save();
        // console.log("Created user:", newUser);

        // Respond with the newly created user and a success message
        res.status(201).json({
          user: newUser,
          message: "User registered successfully",
        });
      } catch (error) {
        // Handle any errors and respond with an error message
        console.error("Error:", error.message);
        res.status(400).json({ message: error.message });
      }
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
