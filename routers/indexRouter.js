const express = require("express");
const indexRouter = express.Router();
const Client = require("../models/Client");
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

//home page route
indexRouter.get("/", async (req, res) => {
    res.render("home", {...viewData, title: "Home"});
});

//clients page route
indexRouter.get("/clients", async (req,res) =>{
    try{
        const clients = await Client.find().sort({name: 1});
        res.render("clients", {clients});
    }catch (err){
        console.error(err);
        res.status(500).send("Server Error");
    }
});

//client details route
indexRouter.get("/clients/:id", async (req, res) => {
    try{
        const client = await Client.findById(req.params.id);
        res.render("clientDetails", {client})
    } catch (err){
        console.error(err);
        res.status(404).send("Client not found.")
    }
});

indexRouter.get("/products", async (req, res) => {
    try{
        const products = await Product.find().sort({productName: 1});
        res.render("products", {...viewData, products, title: "Products"});
    }catch (err){
        console.error(err);
        res.status(500).send("Server Error")
    }
});

indexRouter.get("/products/:id", async (req, res) => {
    try{
        const products = await Product.findById(req.params.id);
        res.render("productDetails", {...viewData, products, title: "Product Detail"})
    } catch (err){
        console.error(err);
        res.status(404).send("Client not found.")
    }
});

module.exports = indexRouter;