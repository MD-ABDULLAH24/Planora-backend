import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: Number(process.env.PORT) || 5000,
  database_url: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || "secret",
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || "refresh secret",
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
}; 
