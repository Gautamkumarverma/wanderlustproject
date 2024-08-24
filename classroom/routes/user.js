const express = require("express");
const router = express.Router();


// index route
router.get("/", (req, res) => {
    res.send("Get for Users");
});

//show users
router.get("/:id", (req, res) => {
    res.send("GET forusers id");
});
//POST - users
router.post("/", (req, res) => {
    res.send("POST for users ");
});

// DELETE - users
router.delete("/:id", (req, res) => {
    res.send("DELETE  for user id");
});


module.exports = router;

