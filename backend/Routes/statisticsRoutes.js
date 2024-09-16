const express = require('express');
const router = express.Router();
const { fetchSummaryStatistics } = require('../Controllers/statisticsControllers');

// Route to fetch summary statistics
router.get('/summaryStatistics', fetchSummaryStatistics);

module.exports = router;
 