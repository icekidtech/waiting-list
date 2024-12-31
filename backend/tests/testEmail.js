import dotenv from 'dotenv';
import { SMTPClient } from 'emailjs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Determine __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env file
const dotenvPath = path.resolve(__dirname, '../backend/.env');
console.log('Checking .env file path:', dotenvPath);

if (!fs.existsSync(dotenvPath)) {
  console.error(`.env file not found at path: ${dotenvPath}`);
  process.exit(1); // Exit if .env file is missing
}

const dotenvResult = dotenv.config({ path: dotenvPath });
if (dotenvResult.error) {
  console.error('Error loading .env file:', dotenvResult.error);
  process.exit(1); // Exit if .env file fails to load
}

console.log('Loaded .env file successfully:', dotenvResult.parsed);

// Log environment variables to confirm they are loaded correctly
console.log('Environment Variables:', {
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
});

// Set up fallback values to avoid undefined variables
const smtpConfig = {
  user: process.env.SMTP_USER || 'default_user',
  password: process.env.SMTP_PASS || 'default_password',
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  ssl: false, // Adjust based on your SMTP service requirements
  debug: true,
};

// Log SMTP configuration to debug
console.log('SMTP Configuration:', smtpConfig);

const client = new SMTPClient(smtpConfig);

// Function to send an email with OTP
(async () => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    console.log(`Generated OTP: ${otp}`);

    await client.sendAsync({
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      from: 'Brink gaming <noreply@yourapp.com>',
      to: 'Recipient <edwinidopise@gmail.com>',
      subject: 'Your OTP Code',
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error during email test:', error.message);
  }
})();