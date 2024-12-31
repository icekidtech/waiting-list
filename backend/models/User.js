import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database.js';

// Define the User model
const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 25], // Username must be between 3-25 characters
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensure it's a valid email
      },
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true, // OTP will only exist temporarily
    },
    otpExpiry: {
      type: DataTypes.DATE,
      allowNull: true, // OTP expiration timestamp
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically set the current timestamp
    },
  },
  {
    hooks: {
      // Add hooks here if needed (e.g., beforeCreate, beforeUpdate)
    },
    defaultScope: {
      attributes: { exclude: ['otp'] }, // Exclude OTP by default
    },
    scopes: {
      withOtp: { attributes: {} }, // Include OTP when needed
    },
  }
);

// Function to set OTP and expiration
User.prototype.setOtp = async function (otp) {
  this.otp = otp;
  this.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Set expiry to 10 minutes from now
};

// Validate OTP
User.prototype.validateOtp = async function (otp) {
  if (this.otp === otp && this.otpExpiry > new Date()) {
    this.otp = null; // Clear OTP after successful validation
    this.otpExpiry = null;
    await this.save();
    return true;
  }
  return false;
};

export default User;