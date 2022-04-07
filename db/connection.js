import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const devConfig = {
  user: process.env.PG_USER,
  passowrd: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

const pool = new Pool({
  user: "christopher",
  password: process.env.PG_PASSWORD,
  host: "localhost",
  database: "user-authentication-restful-api",
  port: 5432,
});

export default pool;
