const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable SQL query logs (optional)
});

module.exports = sequelize;