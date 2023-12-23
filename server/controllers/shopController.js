// Import required modules
const { Shop , ShopType , StallCategory , IncomeCategory } = require('../models/ShopModel');

// Get all shops
const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new shop
const createShop = async (req, res) => {
  try {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a shop by ID
const getShopByID = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Edit a shop by ID
const editShopByID = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a shop by ID
const deleteShopByID = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllShops,
  createShop,
  getShopByID,
  editShopByID,
  deleteShopByID
};
