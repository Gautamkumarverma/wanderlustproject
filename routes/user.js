const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userComtroller = require("../controllers/users.js");

router.get("/signup", userComtroller.renderSignUpForm);

router.post("/signup", wrapAsync(userComtroller.signupUser));

router.get("/login", userComtroller.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login", //login is happning here
    failureFlash: true,
  }),
  userComtroller.loginUser
  //   it is when user try to do any thing like addListing or delete beforlogin
);

router.get("/logout", userComtroller.logoutUser);

module.exports = router;
