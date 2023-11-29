const express = require("express");
const productsRouter = express.Router();
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

  productsRouter.get("/", async (req, res) => {
    try{
        const products = await Product.find({}).sort({productName: 1});
        console.log("Hi", products);
        res.render("products", {...viewData, products, title: "Products"});
    }catch (err){
        console.error(err);
        res.status(500).send("Server Error")
    }
});

productsRouter.get("/products/:id", async (req, res) => {
    try{
        const products = await Product.findById(req.params.id);
        res.render("productDetails", {...viewData, products, title: "Product Detail"})

    } catch (err){
        console.error(err);
        res.status(404).send("Client not found.")
    }
});

module.exports = productsRouter;