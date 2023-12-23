
const express = require('express');
const router = express.Router();
const CityModel = require('../models/CityModel');
const  {getAllCities, getCityById, createCity, updateCityById, deleteCityById} = require('../controllers/cityController');

// GET all cities
router.get('/',  getAllCities);

// GET a specific city
router.get('/:id',  getCityById);

// POST a new city
router.post('/',  createCity);

// PATCH an existing city
router.patch('/:id', updateCityById);

// DELETE a city
router.delete('/:id',  deleteCityById);

module.exports = router;
