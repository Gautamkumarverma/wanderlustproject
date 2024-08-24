const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
// Listing All post || index route
router.get("/", wrapAsync(listingController.index));

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show route
router.get("/:id", wrapAsync(listingController.showListing));

// Create route
router.post(
  "/",
  validateListing,
  isLoggedIn,
  wrapAsync(listingController.createListing)
);
// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// Update route
router.put(
  "/:id",
  validateListing,
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.updateListing)
);

// delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
