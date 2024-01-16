const router = require("express").Router();
const CommonController = require("../controllers/commonController");

router.get("/shop-types-categories-zones-users", CommonController.getAllData);
router.get("/zone-bazar", CommonController.getZoneBazars);
router.get("/shop-type-category", CommonController.getSimpleShopTypeCategory);
router.get("/bazar-names", CommonController.getOnlyBazarNames);

module.exports = router;
