const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const sequelize = require('./models/db.js'); // Import the sequelize instance

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Use userRoutes for user-related endpoints
app.use('/api', userRoutes);

// Connect to PostgreSQL with Sequelize
sequelize
  .authenticate() // Authenticate the connection
  .then(() => {
    console.log('PostgreSQL connected');
    // Sync the models after successful authentication
    sequelize.sync({ alter: true })  // Use alter: true to safely update the schema if necessary
      .then(() => {
        console.log('Database synced');
      })
      .catch((error) => {
        console.error('Error syncing database:', error);
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});