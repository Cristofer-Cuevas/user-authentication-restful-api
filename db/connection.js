import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "christopher",
  password: "password",
  host: "localhost",
  database: "user-authentication-restful-api",
  port: 5432,
});

export default pool;
