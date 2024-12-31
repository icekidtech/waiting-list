import { SMTPClient } from 'emailjs';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

// Debugging SMTP Config
console.log('SMTP Configuration:', {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
});

// Function to generate a 6-digit OTP
export function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to send OTP via Email using EmailJS
export async function sendOtpEmail(email, otp) {
    // Create an SMTP client instance
    const client = new SMTPClient({
        user: process.env.SMTP_USER, // SMTP username
        password: process.env.SMTP_PASS, // SMTP password
        host: process.env.SMTP_HOST, // SMTP host
        port: parseInt(process.env.SMTP_PORT, 10), // SMTP port (convert to number)
        ssl: process.env.SMTP_SSL === 'false', // Use SSL if specified in .env
    });

    // Define the message object
    const message = {
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
        from: process.env.SMTP_FROM || 'Your App <noreply@yourapp.com>',
        to: email,
        subject: 'Your OTP Code',
    };

    try {
        // Send the email and log the result
        await client.sendAsync(message);
        console.log(`OTP email sent to ${email}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}