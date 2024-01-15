const router = require("express").Router();
const CommonController = require("../controllers/commonController");

router.get("/shop-types-categories-zones-users", CommonController.getAllData);

module.exports = router;
