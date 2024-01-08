const express = require("express");
const router = express.Router();
const incomeCategoriesController = require("../controllers/incomeCategoriesController");

router.get("/", incomeCategoriesController.getIncomeCategories);
router.get("/:id", incomeCategoriesController.getIncomeCategory);
router.post("/", incomeCategoriesController.createIncomeCategory);
router.put("/:id", incomeCategoriesController.updateIncomeCategory);
router.delete("/:id", incomeCategoriesController.deleteIncomeCategory);
module.exports = router;
