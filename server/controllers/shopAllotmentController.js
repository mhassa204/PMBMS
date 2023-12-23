const ShopAllotment = require("../models/ShopAllotmentModel");
const { Shop } = require("../models/ShopModel");
const ShopHolder = require("../models/ShopHolderModel");


// Create a new shopAllotment
const assignShop = async (req, res) => {
  console.log(req.body);
    //Bazar Manger can do it
  try {
    const shop = await Shop.findOne({shopID : req.body.shop});
    console.log(shop);

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    const shopHolder = await ShopHolder.findOne({cnic : req.body.shopHolder});
    console.log(shopHolder);
    if (!shopHolder) {
      return res.status(404).json({ error: "ShopHolder not found" });
    }

    
    const shopAllotment = await ShopAllotment.create(
      {
        TxID: 123,
        Shop: shop,
        shopholder: shopHolder,
        Status: "Active",
        monthlyRent: req.body.monthlyRent
      }
      );

      if(!req.body.security)
      {
        shopAllotment.securityPaid = false;
      }
      else{
        shopAllotment.securityPaid = false;
      }



      await shopAllotment.save();

      shop.vacant = false;
      await shop.save();
      
      console.log("cleared!");

    res.status(201).json(shopAllotment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create shopAllotment" });
  }
};

const approveShopAllotment = async (req, res) => {
    //Bazar Manger can do it
  try {
    const shopAllotment = await ShopAllotment.findById(req.body.id);
    if (!shopAllotment) {
      return res.status(404).json({ error: "ShopAllotment not found" });
    }
    shopAllotment.Status = "Active";
    await shopAllotment.save();
    res.status(200).json(shopAllotment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update shopAllotment" });
  }
}

const rejectShopAllotment = async (req, res) => {

    //Zone Manger can do it
    try {
        const shopAllotment = await ShopAllotment.findById(req.body.id);
        if (!shopAllotment) {
          return res.status(404).json({ error: "ShopAllotment not found" });
        }
        shopAllotment.Status = "Rejected";
        await shopAllotment.save();
        res.status(200).json(shopAllotment);
      } catch (error) {
        res.status(500).json({ error: "Failed to update shopAllotment" });
      }
}


// Get all shopAllotments
const getAllShopAllotments = async (req, res) => {
  try {
    const shopAllotments = await ShopAllotment.find();
    res.json(shopAllotments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a shopAllotment by ID
const getShopAllotmentByID = async (req, res) => {
  try {
    const shopAllotment = await ShopAllotment.findById(req.params.id);
    if (!shopAllotment) {
      return res.status(404).json({ error: "ShopAllotment not found" });
    }
    res.json(shopAllotment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit a shopAllotment by ID

const editShopAllotmentByID = async (req, res) => {
    try {
        const shopAllotment = await ShopAllotment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        );
        if (!shopAllotment) {
        return res.status(404).json({ error: "ShopAllotment not found" });
        }
        res.json(shopAllotment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
    }

// Delete a shopAllotment by ID
const deleteShopAllotmentByID = async (req, res) => {
  try {
    const shopAllotment = await ShopAllotment.findByIdAndDelete(req.params.id);
    if (!shopAllotment) {
      return res.status(404).json({ error: "ShopAllotment not found" });
    }
    res.json({ message: "ShopAllotment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const getShopAllotmentByShopHolderID = async (req, res) => {
    try {
      const shopAllotment = await ShopAllotment.find({shopholder : req.params.id});
      if (!shopAllotment) {
        return res.status(404).json({ error: "ShopAllotment not found" });
      }
      res.json(shopAllotment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };


const printAgreement = async (req, res) => {
    try {
      const shopAllotment = await ShopAllotment.findById(req.params.id);
      if (!shopAllotment) {
        return res.status(404).json({ error: "ShopAllotment not found" });
      }
      res.json(shopAllotment);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = {
  assignShop,
  approveShopAllotment,
  rejectShopAllotment,
  getAllShopAllotments,
  getShopAllotmentByID,
  editShopAllotmentByID,
  deleteShopAllotmentByID,
};