const express = require("express");
const productsRouter = express.Router();
const ProfileController = require("../controllers/ProductController");
const Product = require("../models/Product");

//view data
const viewData = {
    title: "A02 - Express Billing",
    users: ["Pat", "Sydnee", "Kai", "Chuan"],
    pages: [
      { name: "Home", path: "/"},
      { name: "Clients", path: "/clients"},
      { name: "Products", path: "/products"}, 
    ],
  };

productsRouter.get("/", ProfileController.Products);

productsRouter.get("/products/:id", ProfileController.ProductDetail);

module.exports = productsRouter;