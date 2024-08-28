// Load environment variables
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "development.env" });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: String(process.env.DB_PASSWORD),
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});
export default pool;
