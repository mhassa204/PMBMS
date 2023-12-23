const express = require('express');
const router = express.Router();
const { getZones, getZoneById, createZone, deleteZoneById, updateZoneById } = require('../controllers/zoneController');


router.get('/', getZones);

router.get('/:id', getZoneById);

router.post('/',  createZone);

router.delete('/:id', deleteZoneById);

router.patch('/:id', updateZoneById);

module.exports = router;
