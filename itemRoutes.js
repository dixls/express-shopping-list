const express = require("express");
const items = require("./fakeDb")
const router = new express.Router();

router.get("/items", (req, res) => {
    res.send(items)
})

module.exports = router;