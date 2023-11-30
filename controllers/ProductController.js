const ProductOps = require("../data/ProductOps");
const _productOps = new ProductOps();

exports.Products = async function(request, response){
    console.log("loading products from controller");
    let products = await _productOps.getAllProducts();
    if (products) {
        response.render("products", {
            title: "Express Billing - Products",
            products: products,
        });
    } else {
        response.render("products", {
            title: "Express Billing - Products",
            products: [],
        });
    }
};

exports.ProductDetail = async function (request, response) {
    const productId = request.params.id;
    console.log(`loading single product by id ${productId}`);
    let product = await _productOps.getProductById(productId);
    let products = await _productOps.getAllProducts();
    if (product) {
      response.render("product", {
        title: "Express Yourself - " + product.productName,
        products: products,
        productId: request.params.id,
        layout: "./layouts/full-width",
      });
    } else {
      response.render("products", {
        title: "Express Yourself - Products",
        products: [],
      });
    }
  };

  exports.createProduct = async function(req,res){
    const productData = req.body;
    try{
      const newProduct = await ProductOps.createProduct(productData);
      res.status(201).json(newProduct);
    }catch(error){
      res.status(500).json({error: "Error creating product"});
    }
  };

  exports.updateProduct = async function (req, res) {
    const productId = req.params.id;
    const newData = req.body; // Data to update, sent through the request body
    try {
      const updatedProduct = await ProductOps.updateProduct(productId, newData);
      if (!updatedProduct) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(updatedProduct);
      }
    } catch (error) {
      res.status(500).json({ error: "Error updating product" });
    }
  };
  
  exports.deleteProduct = async function (req, res) {
    const productId = req.params.id;
    try {
      const deletedProduct = await ProductOps.deleteProduct(productId);
      if (!deletedProduct) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(deletedProduct);
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting product" });
    }
  };