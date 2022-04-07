import express from "express";
import cors from "cors";
import passport from "passport";
import "./auth/jwt-auth.js";
import router from "./routes/userAuthRoutes.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  app.use(router);
  console.log(`Server running on port ${PORT}`);
});
