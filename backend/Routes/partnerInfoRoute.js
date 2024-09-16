const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PartnerInfoController = require('../Controllers/PartnerInfoController');

// Middleware to authenticate JWT token
router.use(auth);

// Route to fetch partner information
router.get('/', (req, res, next) => {
  console.log('Fetching partner info');
  PartnerInfoController.getPartnerInfo(req, res, next);
});

module.exports = router;
