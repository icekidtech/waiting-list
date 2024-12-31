import express from 'express';
import { body, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import User from '../models/User.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
import { generateOtp, sendOtpEmail } from '../utils/otpUtils.js';
import { generateJwtToken } from '../utils/jwtUtils.js'; // Ensure this is defined

const router = express.Router();

// Signup Route
router.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('A valid email is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({
        where: { [Op.or]: [{ email }, { username }] },
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email or Username already exists' });
      }

      // Create new user
      const otp = generateOtp();
      const newUser = await User.create({ email, username });
      await newUser.setOtp(otp);

      // Send OTP via email
      await sendOtpEmail(email, otp);

      return res.status(201).json({
        message: 'Signup successful. Please check your email for the OTP.',
        user: { id: newUser.id, email: newUser.email, username: newUser.username },
      });
    } catch (error) {
      return res.status(500).json({ message: 'Error during signup', error: error.message });
    }
  }
);

// Login Route
router.post(
  '/login',
  [body('email').isEmail().withMessage('A valid email is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const otp = generateOtp();
      await user.setOtp(otp);
      await user.save();

      await sendOtpEmail(email, otp);

      return res.status(200).json({ message: 'OTP sent to your email. Please use it to log in.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error during login', error: error.message });
    }
  }
);

// Verify OTP Route
router.post(
  '/verify-otp',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  ],
  async (req, res) => {
    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isValid = await user.validateOtp(otp);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
      }

      const token = generateJwtToken(user.id);

      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
  }
);

// Fetch all users
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['username', 'email', 'createdAt'] });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Protected route: Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findByPk(userId, {
      attributes: ['username', 'email', 'createdAt'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Welcome to your dashboard!',
      user: {
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error loading dashboard', error: error.message });
  }
});

export default router;