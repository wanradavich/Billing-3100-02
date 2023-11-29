const ProductOps = require("../data/ProductOps");
const _profileOps = new ProductOps();

exports.Products = async function(request, response){
    console.log("loading products from controller");
    let products = await _profileOps.getAllProducts();
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
    let product = await _productOps.getProfileById(profileId);
    let products = await _productOps.getAllProfiles();
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