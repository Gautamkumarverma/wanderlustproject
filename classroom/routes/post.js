const express = require("express");
const router = express.Router();


// posts

// INDEX - posts
router.get("/", (req, res) => {
    res.send("Get for posts");
});

//show posts
router.get("/:id", (req, res) => {
    res.send("GET for posts id");
});
//POST - posts
router.post("/", (req, res) => {
    res.send("POST for posts ");
});

// DELETE - posts
router.delete("/:id", (req, res) => {
    res.send("DELETE  for user id");
});
module.exports = router;