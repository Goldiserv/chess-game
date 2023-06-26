import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const apiKey = process.env.CE_API;
const apiSecret = process.env.CE_API_SECRET;

console.log(`API Key: ${apiKey}`);
console.log(`API Secret: ${apiSecret}`);