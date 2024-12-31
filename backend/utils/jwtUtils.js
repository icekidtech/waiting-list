import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key'; // Use a strong secret in production
const JWT_EXPIRES_IN = '1h'; // Set an expiration time for the token

/**
 * Generates a JWT token for the given user ID.
 * @param {string} userId - The ID of the user for whom the token is being generated.
 * @returns {string} - The generated JWT token.
 */
export function generateJwtToken(userId) {
  if (!userId) {
    throw new Error('User ID is required to generate a JWT token.');
  }

  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}