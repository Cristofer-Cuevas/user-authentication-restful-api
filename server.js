import express from "express";
import cors from "cors";
import pool from "./db/connection.js";
import passport from "passport";
import "./auth/jwt-auth.js";

const app = express();

const path = new URL(import.meta.url).pathname;

const PORT = 3001 || process.env.PORT;
console.log(path);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
