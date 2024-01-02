const BazarModel = require("../models/BazarModel");
const {Shop , ShopType} = require("../models/ShopModel");
const asyncHandler = require("express-async-handler");
const CityModel = require("../models/CityModel");
const ZoneModel = require("../models/ZoneModel");

// Controller functions

// Get all bazars
const getAllBazars = asyncHandler(async (req, res) => {
  const bazars = await BazarModel.find();
  res.status(200).json(bazars);
});

const createBazar = asyncHandler(async (req, res) => {
  // Extract Bazar details from the request body
  const { name, address, city, zone, baseRentPermanent, prefix, image, zoneManager, bazarManager, supervisor, shopTypes } = req.body;


  const city1 = await CityModel.findOne({name : city});
  const zone1 = await ZoneModel.findOne({name: zone});


  console.log(city1);
  console.log(zone1);


  // Create Bazar instance
  const bazar = new BazarModel({
    name,
    address,
    city: city1._id,
    zone: zone1._id,
    baseRentPermanent,
    prefix,
    image,
    zoneManager,
    bazarManager,
    supervisor,
  });

  // Save the Bazar to get the _id
  const newBazar = await bazar.save();

  console.log(zone1.name);
  console.log(city1.prefix);

  // Create and save shops based on the provided Shop Types
  const shopTypesArray = Object.keys(shopTypes);
  let counter = 0;
  for (const shopTypeName of shopTypesArray) {
    const shopTypeCount = shopTypes[shopTypeName];
    for (let i = 0; i < shopTypeCount; i++) {
      const shop = new Shop({
        shopID: `${city1.prefix}-${zone1.name}-${newBazar.prefix}-${shopTypeName}-${counter}`,
        shopType: shopTypeName, // Get the ShopType ObjectId based on the name
        bazar: newBazar._id,
        size: 'default', // Set the default size or modify as needed
      });
      counter++;
      await shop.save();
      newBazar.approvedShops.push(shop._id); // Add the shop to the approvedShops array in Bazar
    }
  }

  // Save the updated Bazar with the created shops
  await newBazar.save();

  res.status(201).json(newBazar);
});


// Get a single bazar
const getBazarById = asyncHandler(async (req, res) => {
  const bazar = await BazarModel.findById(req.params.id);
  if (bazar) {
    res.status(200).json(bazar);
  } else {
    res.status(404).json({ message: "Bazar not found" });
  }
});

// Update a bazar
const updateBazar = asyncHandler(async (req, res) => {
  const bazar = await BazarModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (bazar) {
    res.json(bazar);
  } else {
    res.status(404).json({ message: "Bazar not found" });
  }
});

// Delete a bazar
const deleteBazar = asyncHandler(async (req, res) => {
  const bazar = await BazarModel.findById(req.params.id);
  if (bazar) {
    await bazar.remove();
    res.status(200).json({ message: "Bazar deleted" });
  } else {
    res.status(404).json({ message: "Bazar not found" });
  }
});

// Export controller functions
module.exports = {
  getAllBazars,
  createBazar,
  getBazarById,
  updateBazar,
  deleteBazar,
};
