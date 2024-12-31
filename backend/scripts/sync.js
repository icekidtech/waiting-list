const sequelize = require('../config/database.js');
const User = require('../models/User.js');

(async () => {
  try {
    await sequelize.authenticate(); // Test connection
    console.log('Connection has been established successfully.');
    
    // Sync models with the database
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close(); // Close connection
  }
})();