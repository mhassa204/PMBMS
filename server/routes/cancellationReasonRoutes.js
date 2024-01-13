const router = require("express").Router();
const cancellationReasonController = require("../controllers/cancellationReasonsController");

router.post("/", cancellationReasonController.create);
router.get("/", cancellationReasonController.findAllReasons);
router.get("/:id", cancellationReasonController.findOneReason);
router.put("/:id", cancellationReasonController.updateReason);
router.delete("/:id", cancellationReasonController.deleteReason);

module.exports = router;
