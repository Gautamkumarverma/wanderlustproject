const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");



const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// Listing All post
app.get("/listings", wrapAsync ( async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}));
// <------------------------------>

// New route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// Create route
app.post("/listings", wrapAsync (async (req, res,next) => {
    if (!req.body.listing) {
       throw new ExpressError(400, "send valid for listing !");
    }
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
 
}));
// <--------------------------------->
//show route
app.get("/listings/:id", wrapAsync ( async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });

}));


// Edit route
app.get("/listings/:id/edit", wrapAsync ( async (req, res) => {
    console.log("Greate");
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs", { listing });
}));

// Update route
app.put("/listings/:id", wrapAsync ( async (req, res) => {
  
    if (!req.body.listing) {
        throw new ExpressError(400, "send valid for listing !");
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    console.log(listing);
    res.redirect(`/listings/${id}`);
}));
// delete route
app.delete("/listings/:id", wrapAsync ( async (req, res) => {
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log("pppppppppppppp", deletedList);
    res.redirect("/listings");
}));


// <======== from here========================>


app.get("/", (req, res) => {
    res.send("working  fine");
});


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute Goa",
//         country: "India",
//     });
//     // Listing.clear();
//     await sampleListing.save();
//     console.log("sample bwas saved");
//     res.send("successful testing");


// });
// If no any route match with the incoming requext
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found !"));
});
// error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;  // Default to 500 if no statusCode is provided
    const message = err.message || "Internal Server Error";
   
    res.render("error.ejs",{message});
    // res.status(statusCode).send(message);
});
app.listen(5000, () => {
    console.log("listening to port 8080");
});