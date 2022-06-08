const express = require("express");
let items = require("./fakeDb")
const router = new express.Router();
const { Item } = require("./helpers")

router.get("/", (req, res) => {
    return res.json({ Items: items })
})

router.post("/", (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, +req.body.price);
        items.push(newItem);
        res.status(200).send({
            added: newItem
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router;