const Partner = require('../models/Partner');

const getPartnerInfo = async (req, res) => {
  try {
    console.log('Fetching partner info for partner ID:', req.user.partner.id);

    const partner = await Partner.findById(req.user.partner.id).select('-password');
    if (!partner) {
      console.log('Partner not found');
      return res.status(404).json({ message: 'Partner not found' });
    }

    console.log('Partner info fetched successfully:', partner);
    res.json(partner);
  } catch (error) {
    console.error('Error fetching partner info:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPartnerInfo,
};
