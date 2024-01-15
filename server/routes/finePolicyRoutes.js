const express = require("express");
const router = express.Router();
const finePolicyController = require("../controllers/finePolicyController");

router.get("/:currentPage/:itemsPerPage", finePolicyController.getFinePolicies); //get all fine policies
router.get("/:id", finePolicyController.getFinePolicy); //get a fine policy by id
router.post("/", finePolicyController.createFinePolicy); //create a fine policy
router.put("/:id", finePolicyController.updateFinePolicy); //update a fine policy
router.delete("/:id", finePolicyController.deleteFinePolicy); //delete a fine policy
module.exports = router;
