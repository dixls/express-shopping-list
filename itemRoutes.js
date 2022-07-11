const express = require("express");
let items = require("./fakeDb")
const router = new express.Router();
const { Item } = require("./helpers")

router.get("/", (req, res) => {
    return res.json({ Items: items });
})

router.post("/", (req, res, next) => {
    try {
        let newItem = new Item(req.body.name, +req.body.price);
        items.push(newItem);
        res.status(200).send({
            added: newItem
        })
    } catch(err) {
        next(err);
    }
})

router.get("/:name", (req, res, next) => {
    try {
        const reqName = req.params.name;
        const reqItem = items.filter(i => i.name === reqName);
        return res.json({Item: reqItem[0]})
    } catch(err) {
        next(err);
    }
})

router.patch("/:name", (req, res, next) => {
    try {
        const reqName = req.params.name;
        const reqItem = items.findIndex(i => i.name === reqName);
        let updatedItem = new Item(req.body.name, +req.body.price);
        items.splice(reqItem, 1, updatedItem);
        return res.json({updated: updatedItem});
    } catch(err) {
        next(err);
    }
})

router.delete("/:name", (req, res, next) => {
    try {
        const reqName = req.params.name;
        const reqItem = items.findIndex(i => i.name === reqName);
        items.splice(reqItem, 1);
        return res.json({message: `${reqName} Deleted`});
    } catch(err) {
        next(err);
    }
})

module.exports = router;