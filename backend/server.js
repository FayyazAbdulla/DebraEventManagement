// server
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); 
const cors = require('cors');
 
// Import Routes  
const partnerRoutes = require('./Routes/partnerRoutes');
const eventRoutes = require('./Routes/eventRoutes');
const partnerloginRoutes = require('./Routes/partnerloginRoute');
const partnerDashboardRoute = require('./Routes/PartnerDashboardRoute');
const partnerInfoRoute = require('./Routes/partnerInfoRoute')
const statisticsRoutes = require('./Routes/statisticsRoutes');
const ticketRoutes = require('./Routes/TicketRoutes');
const authMiddleware = require('./middleware/auth');
const adminRoute = require('./Routes/adminRoutes');
const AdminauthMiddleware = require('./middleware/adminAuth');
const Admin = require('./models/Admin');
const allpartnerRoutes = require('./Routes/allpartnerRoute');
const alleventRoutes = require('./Routes/alleventsRoute');
const allticketRoutes = require('./Routes/allticketsRoute');
const alldashboardmetricsRoutes = require('./Routes/alldashboardmetricsRoute');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));

// Database Connection
mongoose.connect('mongodb://localhost:27017/debra');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error('Failed to connect to MongoDB:', err);
}); 
 
// Routes
app.use('/api/partner_register', partnerRoutes);
app.use('/api/partner', partnerloginRoutes);
app.use('/api/events/create', eventRoutes);
app.use('/api/partner/dashboard', partnerDashboardRoute);
app.use('/api/partnerInfo', partnerInfoRoute);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/debra', adminRoute); 
app.use('/api/allpartners', allpartnerRoutes); // Corrected path
app.use('/api/allevents', alleventRoutes); // Corrected path
app.use('/api/alltickets', allticketRoutes); // Corrected path
app.use('/api/alldashboardmetrics', alldashboardmetricsRoutes); // Corrected path


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!'); 
});

// Create initial admin user
const createInitialAdmin = async () => {
  const username = 'admin'; // Replace with your desired username
  const password = 'admin123'; // Replace with your desired password

  const existingAdmin = await Admin.findOne({ username });
  if (!existingAdmin) {
    const admin = new Admin({ username, password });
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();
    console.log('Initial admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

createInitialAdmin();


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
