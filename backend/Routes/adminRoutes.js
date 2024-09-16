//adminRoutes
const express = require('express');
const router = express.Router();
const { adminLogin } = require('../Controllers/adminControllerr');

// Admin login route
router.post('/admin_login', adminLogin);

module.exports = router;
 