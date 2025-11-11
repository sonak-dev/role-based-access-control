import { config } from "dotenv";

// ✅ This line loads .env file from the project root
config();

// ✅ Now you can safely access environment variables
export const {
    PORT,
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN
} = process.env;
