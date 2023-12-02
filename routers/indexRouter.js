const express = require("express");
const indexRouter = express.Router();


//home page route
indexRouter.get("/", async (req, res) => {
    res.render("home", {...viewData, title: "Home"});
});






module.exports = indexRouter;