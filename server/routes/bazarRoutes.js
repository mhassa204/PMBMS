
const express = require('express');
const router = express.Router();

// Import your controller modules
const {getAllBazars, getBazarById, createBazar, updateBazar, deleteBazar} = require('../controllers/bazarController');

// Define your routes
router.get('/', getAllBazars);
router.get('/:id', getBazarById);
router.post('/', createBazar);
router.put('/:id', updateBazar);
router.delete('/:id', deleteBazar);

module.exports = router;
