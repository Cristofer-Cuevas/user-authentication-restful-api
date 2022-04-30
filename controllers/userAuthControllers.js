import issueJwt from "../utils/jwtUtils.js";
import pool from "../db/connection.js";
import { genPassword, validatePassword } from "../utils/passwordUtils.js";
import { v4 as uuidv4 } from "uuid";

const controllers = {};

// Getting user by username
const getUserByUsername = async (username) => {
  const { rows: user } = await pool.query("SELECT * FROM users_username WHERE username = $1", [username]);
  return user;
};

// Sign in post //
controllers.siginPost = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    // If user doesn't exist
    if (!user[0]) {
      res.json({ userExists: false });
    } else {
      // Validating Pasword
      const isPasswordValid = validatePassword(password, user[0].hash, user[0].salt);
      // Generating token
      if (isPasswordValid) {
        const { token } = issueJwt(user[0].id, "username");
        res.json({ success: true, token, user: { name: user[0].username, id: user[0].id } });
      } else {
        res.json({ success: false, isPasswordValid: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ anInternalErrorOccurred: true });
  }
};

// Sign in with username
controllers.signupPost = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieving if the user exists
    const user = await getUser(username);

    if (user[0]) {
      res.json({ userExists: true });
    } else {
      // Generating password hash and salt.
      const { hash, salt } = genPassword(password);
      // Populating table users_username
      const { rows: user } = await pool.query("INSERT INTO users_username VALUES($1, $2, $3, $4) RETURNING *", [uuidv4(), username, salt, hash]);

      // If the user was successfully saved
      if (user[0]) {
        const { token } = issueJwt(user[0].id, "username");
        res.json({ success: true, token, user: { name: user[0].username, id: user[0].id } });
      } else {
        res.json({ anInternalErrorOccurred: true });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ anInternalErrorOccurred: true });
  }
};

// Auth with email

// Getting user by email
const getUserByEmail = async (email) => {
  const { rows: user } = await pool.query("SELECT * FROM users_email WHERE email = $1", [email]);
  return user;
};

// Sign in with email
controllers.signinPostWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user[0]) {
      res.json({ userExists: false });
    } else {
      console.log(user);
      const isPasswordValid = validatePassword(password, user[0].hash, user[0].salt);
      if (isPasswordValid) {
        const { token } = issueJwt(user[0].id, "email");
        res.json({ success: true, token, user: { name: user[0].name, last_name: user[0].last_name, email: user[0].email, id: user[0].id } });
      } else {
        res.json({ success: false, isPasswordValid: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ anInternalErrorOccurred: true });
  }
};

// Sign up with email
controllers.signupPostWithEmail = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    const user = await getUserByEmail(email);

    if (user[0]) {
      res.json({ userExists: true });
    } else {
      const { hash, salt } = genPassword(password);

      // Populating table users_email
      const { rows: user } = await pool.query("INSERT INTO users_email VALUES($1, $2, $3, $4, $5, $6) RETURNING id", [uuidv4(), name, lastName, email, salt, hash]);

      // if user was successfully saved
      if (user[0]) {
        const { token } = issueJwt(user[0].id, "email");
        res.json({ success: true, token, user: { name: user[0].name, last_name: user[0].last_name, email: user[0].email, id: user[0].id } });
      } else {
        res.json({ success: false, anInternalErrorOccurred: true });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ anInternalErrorOccurred: true });
  }
};

controllers.successRedirect = (req, res) => {
  const { user } = req;
  console.log(req.user);
  res.json({ success: true, user });
};

controllers.failureRedirect = (req, res) => {
  res.json({ success: false, unauthorized: true });
};
export default controllers;
