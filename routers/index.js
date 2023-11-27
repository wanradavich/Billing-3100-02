const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const Product = require("../models/Product");

//home page route
router.get("/", async (req, res) => {
    res.render("home");
});

//clients page route
router.get("/clients", async (req,res) =>{
    try{
        const clients = await Client.find().sort({name: 1});
        res.render("clients", {clients});
    }catch (err){
        console.error(err);
        res.status(500).send("Server Error");
    }
});

//client details route
router.get("/clients/:id", async (req, res) => {
    try{
        const client = await Client.findById(req.params.id);
        res.render("clientDetails", {client})
    } catch (err){
        console.error(err);
        res.status(404).send("Client not found.")
    }
});