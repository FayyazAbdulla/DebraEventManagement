// partnerController.js
const Event = require('../models/Event'); // Adjust the path to your Event model

const fetchPartnerEvents = async (user) => {
  try {
    console.log('Fetching events for user:', user); // Log the user information
    // Your logic to fetch events from the database
    const events = await Event.find({ partnerId: user._id }); // Example query
    return events;
  } catch (error) {
    console.error('Error fetching partner events:', error.message);
    throw new Error('Error fetching partner events');
  }
};

module.exports = { fetchPartnerEvents };

// const fetchPartnerEvents = async (user) => {
//   try {
//     // Your logic to fetch events, possibly querying MongoDB
//     const events = await Event.find({ partnerId: user.partnerId }).exec();
//     return events;
//   } catch (error) { 
//     console.error('Error fetching partner events from the database:', error.message);
//     throw new Error('Error fetching partner events');
//   } 
// };

// module.exports = {
//   fetchPartnerEvents,
// };
