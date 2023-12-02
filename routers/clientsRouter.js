/*const express = require("express");
const clientsRouter = express.Router();
const clientController = require("../controllers/ClientController");
 

productsRouter.get("/", productController.Products);
productsRouter.get("/products/:id", productController.ProductDetail);
productsRouter.get("/search", productController.SearchProducts);
 

module.exports = productsRouter;*/





//copy from Josh

const ClientController = require("../controllers/ClientController");

const fs = require("fs").promises;
const path = require("path");

const express = require("express");
const clientsRouter = express.Router();

// construct the path to our data folder
const dataPath = path.join(__dirname, "../data/");



// Show listing of all profiles
clientsRouter.get("/", ClientController.Index);

// Show Create Profile Form
clientsRouter.get("/edit", ClientController.Create);
// Handle Create Profile Form Submission
clientsRouter.post("/edit", ClientController.CreateClient);

// Show Create Profile Form
clientsRouter.get("/edit/:id", ClientController.Edit);
// Handle Create Profile Form Submission
clientsRouter.post("/edit/:id", ClientController.EditClient);

// Show Individual Profile Details
clientsRouter.get("/:id", ClientController.Detail);

// Delete an Individual Profile
clientsRouter.get("/:id/delete", ClientController.DeleteClientById);

module.exports = clientsRouter;