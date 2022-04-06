import express from "express";
import passport from "passport";
import controllers from "../controllers/userAuthControllers.js";

const router = express.Router();

router.post("/signin", controllers.siginPost);
router.post("/signup", controllers.signupPost);
router.post("/email-signup", controllers.signupPostWithEmail);
router.post("/email-signin", controllers.signinPostWithEmail);

router.get("/protected", passport.authenticate("jwt", { session: false, failureRedirect: "failure-route" }), controllers.successRedirect);

router.get("/failure-route", controllers.failureRedirect);

export default router;
