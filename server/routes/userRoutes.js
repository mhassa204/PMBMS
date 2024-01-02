//userRoutes
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const middleware = require("../middleware/test"); // Update this line

router.post("/test", middleware(["ahmed", "abdullah"]), (req, res) => {
  res.send("Hello from userRoutes");
});

router.post("/login", async (req, res) => {
  let user = await getUserById(req.body.id);
  if (user) {
    let token = jwt.sign({ user: user }, process.env.JWT_TOKEN);
    res.status(200).json({ token: token, user: user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", addUser);

router.delete("/:id", deleteUser);

router.patch("/:id", updateUser);

module.exports = router;
