const express = require("express");
const morgan = require("morgan");
const ExpressError = require("./expressError")

const app = express();

const itemRoutes = require("./itemRoutes")

app.use(morgan("dev"));
app.use(express.json());

app.use("/item", itemRoutes)

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err.message,
    })
})

module.exports = app;