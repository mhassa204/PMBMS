const Zone = require('../models/ZoneModel');

// Create a new zone
const createZone = async (req, res) => {
  const zone = new Zone(req.body);

  try {
    const newZone = await zone.save();
    res.status(201).json(newZone);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create zone' });
  }
};

// Get all zones
const getZones = async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get zones' });
  }
};

// Get a single zone by ID
const getZoneById = async (req, res) => {
  try {
    const zone = await Zone.findById(req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get zone' });
  }
};

// Update a zone by ID
const updateZoneById = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update zone' });
  }
};

// Delete a zone by ID
const deleteZoneById = async (req, res) => {
  try {
    const zone = await Zone.findByIdAndDelete(req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.json({ message: 'Zone deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete zone' });
  }
};

module.exports = {
  createZone,
  getZones,
  getZoneById,
  updateZoneById,
  deleteZoneById,
};
