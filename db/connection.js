import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: "christopher",
  password: process.env.PG_PASSWORD,
  host: "localhost",
  database: "user-authentication-restful-api",
  port: 5432,
});

export default pool;
