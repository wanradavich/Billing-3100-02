"use strict";

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3003;

//declaring mongoose
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Client = require("./models/Client");

//mongoose connection string
const uri = "mongodb+srv://member-A02:PFhtLJ2GXqcHb9jo@billing-a02.xtm7iin.mongodb.net/?retryWrites=true&w=majority"

//load indexRouter
const indexRouter = require("./routers/indexRouter");

//tell express where to find templates(views)
app.set("views", path.join(__dirname, "views"));
//set view engine to ejs
app.set("view engine", "ejs");

//import express ejs layouts
const expressLayouts = require("express-ejs-layouts");
//use ejs layout
app.use(expressLayouts);
//set default layout
app.set("layout", "layouts/full-width")

//morgan logging middleware
const logger = require("morgan");
//use logger as middleware
app.use(logger("dev"));

//parse applicaion form-urlencoded
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

//express static middleware : making the public folder globally accessible
app.use(express.static("public"));

//index route
app.use("/", indexRouter);

//catch any unmatched routes
app.all("/*", (req, res) => {
    res.status(404).send("File not found.")
});

//start listening to port
app.listen(port, () => console.log(`app listening on port ${port}!`))

// set up default mongoose connection
mongoose.connect(uri);

// store a reference to the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Once we have our connection, let's load and log our profiles
// db.once("open", async function () {
//   const profiles = await getAllClientProfiles();
//   console.log(profiles);
//   // if we don't close the db connection, our app will keep running
//   db.close();
// });

// async function getAllClientProfiles() {
//   let profiles = await Client.find({});
//   return profiles;
// }



