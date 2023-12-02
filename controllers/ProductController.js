const ProductOps = require("../data/ProductOps");
const _productOps = new ProductOps();

exports.searchProducts = async function(req, res) {
  const searchQuery = req.query.q;

  try {
    const products = await _productOps.find({
      productName: { $regex: searchQuery, $options: "i" }
    });

    res.render("productSearchResults", { products: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//for client in the ClientController later
// exports.SearchClients =  async function(req, res) {
//   const searchQuery = req.query.q;

//   try {
//       const clients = await Client.find({
//           clientName: { $regex: searchQuery, $options: "i" }
//       });

//       res.render("clients", { clients }); // Render clients.ejs with filtered clients
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// }

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
  