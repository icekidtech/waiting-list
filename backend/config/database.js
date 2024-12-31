import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('Error: DATABASE_URL is not defined in your environment variables.');
  process.exit(1); // Exit the process if DATABASE_URL is missing
}

// Create the Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { require: true, rejectUnauthorized: false } // Enable SSL in production
        : false,
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable SQL logging only in development
});

// Export the Sequelize instance
export default sequelize;