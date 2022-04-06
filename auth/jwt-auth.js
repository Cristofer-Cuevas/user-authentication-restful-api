import passport from "passport";
import fs from "fs";
import { ExtractJwt, Strategy } from "passport-jwt";
import pool from "../db/connection.js";

const JwtStrategy = Strategy;

// ---------- Reading public key ---------- //
const PUB_KEY = fs.readFileSync("./id_rsa_pub.pem", { encoding: "utf8" }, new URL(import.meta.url).pathname);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const getUser = (done, payload, columns, table) => {
  pool.query(`SELECT ${columns} FROM ${table} WHERE id = $1`, [payload.sub], (err, { rows }) => {
    if (rows[0]) {
      done(null, rows[0]);
    } else {
      done(err, false);
    }
  });
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    if (payload.with === "username") {
      getUser(done, payload, "id, username", "users_username");
    } else if (payload.with === "email") {
      getUser(done, payload, "id, name, last_name, email", "users_email");
    }
  })
);
