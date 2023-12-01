const express = require("express");
const productsRouter = express.Router();
const productController = require("../controllers/ProductController");
 

productsRouter.get("/", productController.Products);
productsRouter.get("/products/:id", productController.ProductDetail);
productsRouter.get("/search", productController.SearchProducts);
 

module.exports = productsRouter;