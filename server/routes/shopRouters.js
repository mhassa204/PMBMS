const router = require('express').Router();
const { getAllShops , createShop ,getShopByID , editShopByID , deleteShopByID } = require('../controllers/shopController');

// Get all shops
router.get('/', getAllShops);

// Get shop by ID
router.get('/:id', getShopByID);

// Create shop
router.post('/', createShop);

// Edit shop by ID
router.patch('/:id', editShopByID);

// Delete shop by ID
router.delete('/:id', deleteShopByID);

module.exports = router;
