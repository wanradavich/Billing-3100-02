const express = require("express");
const productsRouter = express.Router();
const productController = require("../controllers/ProductController");
 


  productsRouter.get("/", productController.Products);

  productsRouter.get("/edit", productController.Create);
  
  productsRouter.post("/edit", productController.CreateProduct);
  
  productsRouter.get("/:id", productController.ProductDetail);
  
  productsRouter.get("/edit/:id", productController.Edit);
  
  productsRouter.post("/edit/:id", productController.EditProduct);

  productsRouter.get("/:id/delete", productController.DeleteProductById);



 

module.exports = productsRouter;