const ShopHolder = require('../models/ShopHolderModel');

// Get all shopHolders
const getAllShopHolders = async (req, res) => {
    try {
        const shopHolders = await ShopHolder.find();
        res.status(200).json(shopHolders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new shopHolder
const createShopHolder = async (req, res) => {
    const shopHolder = new ShopHolder(req.body);

    try {
        const newShopHolder = await shopHolder.save();
        res.status(201).json(newShopHolder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get a single shopHolder

const getShopHolderById = async (req, res) => {
    try{
        const shopHolder = await ShopHolder.findById(req.params.id);
        if (shopHolder) {
          res.json(shopHolder);
        } else {
          res.status(404).json({ message: 'ShopHolder not found' });
        }
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
}

// Update a shopHolder
const updateShopHolder = async (req, res) => {
    try { 
        const shopHoler = await ShopHolder.findByIdAndUpdate(req.params.id , req.body , {new : true});
        if (shopHoler) {
          res.json(shopHoler);
        } else {
          res.status(404).json({ message: 'ShopHolder not found' });
        }
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }

}

// Delete a shopHolder
const deleteShopHolder = async (req, res) => {
    try {
        const shopHolder = await ShopHolder.findById(req.params.id);
        if (shopHolder) {
            await shopHolder.remove();
            res.status(200).json({ message: 'ShopHolder deleted' });
        } else {
            res.status(404).json({ message: 'ShopHolder not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = {
    getAllShopHolders,
    createShopHolder,
    getShopHolderById,
    updateShopHolder,
    deleteShopHolder
}

