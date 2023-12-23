const CityModel = require('../models/CityModel');

// Create a new city
const createCity = async (req, res) => {
  try {
    const city = await CityModel.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create city' });
  }
};

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await CityModel.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get cities' });
  }
};

// Get a single city by ID
const getCityById = async (req, res) => {
  try {
    const city = await CityModel.findById(req.params.id);
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get city' });
  }
};

// Update a city by ID
const updateCityById = async (req, res) => {
  try {
    const city = await CityModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update city' });
  }
};

// Delete a city by ID
const deleteCityById = async (req, res) => {
  try {
    const city = await CityModel.findByIdAndDelete(req.params.id);
    if (city) {
      res.json({ message: 'City deleted successfully' });
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city' });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCityById,
  deleteCityById,
};
