const express = require('express');
const User = require('../models/User.js'); // Assuming you have a User model
const router = express.Router();

// POST request to add a new user
router.post('/addUser', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Create a new user using Sequelize ORM
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// GET request to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Sequelize query to fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;