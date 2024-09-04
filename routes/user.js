const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userComtroller = require("../controllers/users.js");
const { route } = require("./listing.js");

router
  .route("/signup")
  .get(userComtroller.renderSignUpForm)
  .post(wrapAsync(userComtroller.signupUser));

router
  .route("/login")
  .get(userComtroller.renderLoginForm)
  .post(
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
