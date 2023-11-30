const express = require("express");
const productsRouter = express.Router();
// const ProductOps = require("../data/ProductOps");
const productController = require("../controllers/ProductController");
 
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

productsRouter.get("/", productController.Products);

productsRouter.get("/products/:id", productController.ProductDetail);
 
// productsRouter.get("/", async (req, res) => {
//   try{
//     const products = await ProductOps.getAllProducts();
//     res.render("products", {pages: viewData.pages, 
//                             title: "Products", 
//                             products: products});
//   } catch (error){
//     res.status(500).send("Error fetching products");
//   }
// });

// productsRouter.get("/products/:id", async (req, res) => {
//   try{
//     const productId = req.params.id;
//     const product = await ProductOps.getProductById(productId);

//     if(product){
//       res.render("product", {
//         title: `Product: ${product.productName}`,
//         product: product,
//       });
//     } else {
//       res.status(404).send("Product not found");
//     }
//   } catch (error){
//     res.status(500).send("Error fetching product");
//   }
// });

module.exports = productsRouter;