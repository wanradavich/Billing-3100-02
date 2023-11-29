"use strict";

const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3007;
require("dotenv").config();

//declaring mongoose
const mongoose = require("mongoose");
const Product = require("./models/Product");
const Client = require("./models/Client");

//mongoose connection string
 //"mongodb+srv://member-A02:PFhtLJ2GXqcHb9jo@billing-a02.xtm7iin.mongodb.net/?retryWrites=true&w=majority"
 const uri = process.env.MONGO_CONNECTION_STRING;
//load indexRouter
const indexRouter = require("./routers/indexRouter");
const productsRouter = require("./routers/productsRouter");

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
const { profile } = require("console");
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

//express static middleware : making the public folder globally accessible
app.use(express.static("public"));

//index route
app.use("/", indexRouter);
app.use("/products", productsRouter);

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
db.once("open", async function () {
    try {
      const products = await getAllProducts();
      console.log("Products:", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  });
  
  // Don't close the connection here
  
  async function getAllProducts() {
    try {
      const profiles = await Product.find({});
      return profiles;
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }

async function getProductsById(id){
    console.log(`getting product by id ${id}`);
    let product = await Product.findById(id);
    return product
}



