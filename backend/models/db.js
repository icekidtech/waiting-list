const { Sequelize } = require('sequelize');
require('dotenv').config();  // Import dotenv to use environment variables

// Create a new instance of Sequelize to connect to your PostgreSQL database
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name from .env
  process.env.DB_USER, // Database user from .env
  process.env.DB_PASSWORD, // Database password from .env
  {
    host: process.env.DB_HOST, // Host from .env (typically localhost)
    dialect: 'postgres', // Tell Sequelize to use PostgreSQL
    logging: false, // Disable logging (optional)
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;