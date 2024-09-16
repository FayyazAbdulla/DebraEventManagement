// allpartnerRoute.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/adminAuth');
const Partner = require('../models/Partner');

// Fetch all partners
router.get('/', verifyToken, async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) { 
    res.status(500).json({ message: 'Error fetching partners' });
  }
});

// Add a new partner
router.post('/', verifyToken, async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: 'Error adding partner' });
  }
});

// Update an existing partner
router.put('/:partnerId', verifyToken, async (req, res) => {
  try {
    const updatedPartner = await Partner.findByIdAndUpdate(req.params.partnerId, req.body, { new: true });
    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: 'Error updating partner' });
  }
});

// Delete a partner
router.delete('/:partnerId', verifyToken, async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.partnerId);
    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting partner' });
  }
});

module.exports = router;
