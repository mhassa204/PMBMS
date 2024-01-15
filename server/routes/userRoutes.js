//userRoutes
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// router.get("/user", UserController.getUsersNames);
router.post("/login", UserController.login);
router.get("/:currentPage/:itemsPerPage", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.addUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);
module.exports = router;
