import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'; // User routes
import sequelize from './config/database.js'; // Sequelize instance

dotenv.config();

const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Mount user-related routes under the /api/v1/users path
app.use('/api/v1/users', userRoutes);

// Database initialization function
async function initializeDatabase() {
  try {
    await sequelize.authenticate(); // Authenticate the connection
    console.log('PostgreSQL connected');

    await sequelize.sync({ alter: true }); // Adjust the schema safely
    console.log('Database synced');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1); // Exit the process if the database fails to connect
  }
}

// Start the server function
async function startServer() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    // Initialize the database
    await initializeDatabase();
  });
}

// Start the server directly if the file is run
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

// Export necessary modules for testing
export { app, initializeDatabase };