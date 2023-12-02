const ProductOps = require("../data/ProductOps");
const _productOps = new ProductOps();
const Product = require("../models/Product.js");
const SearchOps = require("../data/SearchOps");

exports.searchProducts = async function(req, res) {
  const searchQuery = req.query.q;

  try{
    const products = await SearchOps.searchProducts(searchQuery);
    res.render("products", {products: products, layout: "layouts/full-width"});
  } catch (error){
    res.status(500).json({error: error.message});
  }
};

exports.Products = async function(request, response){
    console.log("loading products from controller");
    let products = await _productOps.getAllProducts();
    if (products) {
        response.render("products", {
            title: "Express Billing - Products",
            products: products,
            layout: "layouts/full-width"
        });
    } else {
        response.render("products", {
            title: "Express Billing - Products",
            products: [],
            layout: "layouts/full-width"
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
        title: "Express Billing - " + product.productName,
        products: products,
        productId: request.params.id,
        layout: "layouts/full-width",
      });
    } else {
      response.render("productsDetails", {
        title: "Express Billing - Products",
        products: [],
        layout: "layouts/full-width"
      });
    }
  };

  exports.Create = async function (request, response) {
    response.render("product-form", {
      title: "Create Product",
      errorMessage: "",
      product_id: null,
      product: {},
      layout: "layouts/full-width"
    });
  };

  exports.CreateProduct = async function (request, response) {
    let tempProductObj = new Product ({
      productName: request.body.productName,
      unitCost: request.body.unitCost,
      productCode: request.body.productCode,
    });

    let responseObj = await _productOps.createProduct(tempProductObj);

    if(responseObj.errorMsg == "") {
      let products = await _productOps.getAllProducts();
      console.log(responseObj.obj);
      response.render("products", {
        title: "Products",
        products: products,
        product_id: responseObj.obj.product_id.valueOf(),
        layout: "layouts/full-width"
        //this is where we can set the layout
      });
    }
    else {
      console.log("An error occured. Product was not created.");
      response.render("product-form", {
        title: "Create product",
        product: responseObj.obj,
        errorMessage: responseObj.errorMsg,
        layout: "layouts/full-width"
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
      product: productObj,
      layout: "layouts/full-width"
    });
  };

  exports.EditProduct = async function (request, response) {
    const productId = request.body.product_id;
    const productObj = {
      productName: request.body.productName,
      unitPrice: request.body.unitCost,
      productCode: request.body.productCode,
    }

    // const formObj = {
    //   name: req.body.name,
    //   code: req.body.code,
    //   unit_cost: req.body.unit_cost
    // };
    // const productName = request.body.productName;
    // const unitPrice = request.body.unitCost;
    // const productCode = request.body.productCode;
    console.log(`This is the product id${productId}`);
//656a26e6490cf84463f9d76a
    let responseObj = await _productOps.updateProductById(productId, productObj);

    if(responseObj.errorMsg == "") {
      let products = await _productOps.getAllProducts();
      response.render("product", {
        title: "Products",
        products: products,
        layout: "layouts/full-width"
        //insert layout to be used
      });
    }
    else{
      console.log("An error occured. Item was not updated.");
      response.render("product-form", {
        title: "Edit Product",
        product: responseObj.obj,
        product_id: productId,
        errorMessage: responseObj.errorMsg,
        layout: "layouts/full-width"
      });
    }
  };

  exports.DeleteProductById = async function(request, response) {
    const productId = request.params.id;
    console.log(`deleting a single product by id ${productId}`);
    let deletedProduct = await _productOps.deleteProduct(productId);
    let products = await _productOps.getAllProducts();

    if(deletedProduct) {
      response.render("products", {
        title: "Products",
        products: products,
        layout: "layouts/full-width"
      });
    }
    else {
      response.render("products", {
        title: "Products",
        products: products,
        errorMessage: "Error. Could not delete product.",
        layout: "layouts/full-width"
      });
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

