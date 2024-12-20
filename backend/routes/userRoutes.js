const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const { ensureAuthenticated } = require('../middleware/authMiddleware.js');

const router = express.Router();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables.')
}

// Signup Route
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, password } = req.body;

    try {
      // Check for duplicate email or username
      const existingUser = await User.findOne({
        where: { [User.sequelize.Op.or]: [{ email }, { username }] },
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Email or Username already exists' });
      }

      // Create new user
      const newUser = await User.create({ name, username, email, password });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('usernameOrEmail').notEmpty().withMessage('Username or Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { usernameOrEmail, password } = req.body;

    try {
      // Find user by email or username
      const user = await User.scope('withPassword').findOne({
        where: { [User.sequelize.Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }] },
      });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare password
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
);

// Password Reset Request Route
router.post(
  '/password-reset/request',
  [body('email').isEmail().withMessage('A valid email is required')],
  async (req, res) => {
    const { email } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate a password reset token
      const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });

      // In production, send reset link via email (implement email service)
      const resetLink = `http://yourfrontend.com/reset-password?token=${resetToken}`;
      console.log(`Password Reset Link: ${resetLink}`);

      res.json({
        message: 'Password reset link has been sent to your email',
        resetLink,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error requesting password reset', error: error.message });
    }
  }
);

// Password Reset Confirmation Route
router.post(
  '/password-reset/confirm',
  [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  async (req, res) => {
    const { token, newPassword } = req.body;

    try {
      // Verify the reset token
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.scope('withPassword').findByPk(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'Invalid or expired token' });
      }

      // Update the user's password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
  }
);

// Add a new user
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

// Fetch all users
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