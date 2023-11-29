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
  // ProfileController.Products
productsRouter.get("/", (req, res) => {
  
  res.render("products", {pages: viewData.pages, 
                          title: "Products", 
                          products: ProfileController.Products})
});

productsRouter.get("/products/:id", ProfileController.ProductDetail);

module.exports = productsRouter;