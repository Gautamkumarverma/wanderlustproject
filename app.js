const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");

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
//     console.log("sample was saved");
//     res.send("successful testing");


// });

// delete route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log("pppppppppppppp", deletedList);
    res.redirect("/listings");
});

// Edit route
app.get("/listings/:id/edit", async (req, res) => {
    console.log("Greate");
    let { id } = req.params;
    let listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs", { listing });
});
// Update route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    console.log(listing);
    res.redirect(`/listings/${id}`);
});

//NEW ROUTE
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});
// create route
// app.post("/listings", async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     console.log(newListing);
//     await newListing.save();
  
//     res.redirect("/listings");
// });
// change your create route with this code  --> TA
// is it clear now it is showing w
// because in image path i  type random value

app.post("/listings", async (req, res) => {
    try {
        let { id } = req.params;
        console.log(id);
    const newListing = new Listing(req.body.listing);
    console.log(newListing);
    let result=await newListing.save();
    console.log(result);
    res.redirect("/listings");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving listing");
  }
});



// //This is for checking purpose -> the issue that i am facing
// app.get("/findre", async (req, res) => {
//     let f = await Listing.findById("66af5bceb1e0043e5152721d");

//     console.log(f);
//     res.send("Got result");
// });

// //Index route

app.get("/listings", async (req, res) => {
    let allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
});
//
//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });

});


app.get("/", (req, res) => {
    res.send("working  fine");
})
app.listen(8080, () => {
    console.log("listening to port 8080");
});