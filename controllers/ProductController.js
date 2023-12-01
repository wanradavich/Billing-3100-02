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
      response.render("productDetails", {
        title: "Express Yourself - " + product.productName,
        products: products,
        productId: request.params.id,
        layout: "./layouts/full-width",
      });
    } else {
      response.render("productsDetails", {
        title: "Express Yourself - Products",
        products: [],
      });
    }
  };

  exports.Create = async function (request, response) {
    response.render("product-form", {
      title: "Create Product",
      errorMessage: "",
      product_id: null,
      product: {},
    });
  };

  exports.CreateProduct = async function (request, response) {
    let tempProductObj = new Product ({
      productName: request.body.name,
    });

    let responseObj = await _productOps.createProduct(tempProductObj);

    if(responseObj.errorMsg == "") {
      let products = await _productOps.getAllProducts();
      console.log(responseObj.obj);
      response.render("products", {
        title: "Products - " + responseObj.obj.productName,
        products: products,
        productId: responseObj.obj.productId.valueOf(),
        //this is where we can set the layout
      });
    }
    else {
      console.log("An error occured. Product was not created.");
      response.render("product-create", {
        title: "Create product",
        product: responseObj.obj,
        errorMessage: responseObj.errorMsg
      });
    }
  };


  exports.Edit = async function (request, response) {
    const productId = request.params.id;
    let productObj = await _productOps.getProductById(productId);
    response.render("product-form", {
      title: "Edit Profile",
      errorMessage: "",
      product_id: productId,
      product: productObj
    });
  };

  exports.EditProduct = async function (request, response) {
    const productId = request.body.product_id;
    const productName = request.body.name;

    let responseObj = await _productOps.updateProductById(productId, productName);

    if(responseObj.errorMsg == "") {
      let products = await _productOps.getAllProducts();
      response.render("products", {
        title: "Products",
        products: products,
        productId: responseObj.obj.product_id.valueOf(),
        //insert layout to be used
      });
    }
    else{
      console.log("An error occured. Item was not updated.");
      response.render("product-form", {
        title: "Edit Product",
        product: responseObj.obj,
        productId: productId,
        errorMessage: responseObj.errorMsg
      });
    }
  };

  // exports.createProduct = async function(request, response){
  //   const productData = req.body;
  //   try{
  //     const newProduct = await ProductOps.createProduct(productData);
  //     res.status(201).json(newProduct);
  //   }catch(error){
  //     res.status(500).json({error: "Error creating product"});
  //   }
  // };

  // exports.updateProduct = async function (req, res) {
  //   const productId = req.params.id;
  //   const newData = req.body; // Data to update, sent through the request body
  //   try {
  //     const updatedProduct = await ProductOps.updateProduct(productId, newData);
  //     if (!updatedProduct) {
  //       res.status(404).json({ error: "Product not found" });
  //     } else {
  //       res.status(200).json(updatedProduct);
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: "Error updating product" });
  //   }
  // };
  
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