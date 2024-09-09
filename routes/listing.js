const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const { validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");

const { cloudinay, storage } = require("../cloudConfing.js");
const upload = multer({ storage });

// router.get("/category", (req, res) => {
//   console.log(req.body);
//   console.log("Grate Gautam kumar");
//   res.send("Ram");
// });
router.get("/category/:category", listingController.catagory);
router.post("/search/desti", listingController.searchListing);
// Listing All post || index route
// Create route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );
// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show route
//Delete route
//update  route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,

    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
