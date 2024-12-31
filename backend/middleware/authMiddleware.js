import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Ensure JWT_SECRET is in the .env file
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the .env file.');
}

// Middleware to verify JWT and protect routes
export const ensureAuthenticated = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};