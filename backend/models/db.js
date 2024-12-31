import { Sequelize } from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config(); // Import dotenv to use environment variables

// Create a new instance of Sequelize to connect to your PostgreSQL database
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name from .env
  process.env.DB_USER, // Database user from .env
  process.env.DB_PASSWORD, // Database password from .env
  {
    host: process.env.DB_HOST, // Host from .env
    dialect: 'postgres', // Use PostgreSQL
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false, // For production environments using SSL
    },
    logging: process.env.DB_LOGGING === 'true', // Enable or disable logging based on .env
    pool: {
      max: 5, // Maximum number of connections
      min: 0, // Minimum number of connections
      acquire: 30000, // Maximum time (ms) to acquire a connection
      idle: 10000, // Maximum time (ms) a connection can be idle
    },
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

// Export the sequelize instance
export default sequelize;