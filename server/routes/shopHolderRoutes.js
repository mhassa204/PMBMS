const rotuer = require('express').Router();

const {  getAllShopHolders,
    createShopHolder,
    getShopHolderById,
    updateShopHolder,
    deleteShopHolder } = require('../controllers/shopHolderController');


// Get all shop holders
rotuer.get('/', getAllShopHolders);

// Get shop holder by ID
rotuer.get('/:id', getShopHolderById);

// Create shop holder
rotuer.post('/', createShopHolder);

// Edit shop holder by ID
rotuer.patch('/:id', updateShopHolder);

// Delete shop holder by ID
rotuer.delete('/:id', deleteShopHolder);

module.exports = rotuer;