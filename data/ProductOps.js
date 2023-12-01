const Product = require("../models/Product.js");

class ProductOps {
  ProductOps() {}

  async getAllProducts() {
    try{
      console.log("fetching all products");
    const products = await Product.find({}).sort({productName: 1});
    return products;
    } catch (error){
      console.error("Error fetching products: ", error);
      throw error;
    }
  }

  async getProductById(id) {
    try{
      console.log("fetching product by id")
      const product = await Product.findById(id);
      return product;
    } catch (error){
      console.error("Error fetching products by id: ", error);
      throw error;
    }
  }

  async createProduct(productData){
    try{
      const newProduct = new Product(productData);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error("Error creating product: ", error);
      throw error;
    }
  }

  async updateProduct(id, newData){
    try{
      const updatedProduct = await Product.findByIdAndUpdate(id, newData, {
        new: true,
      });
      return updatedProduct;
    }catch (error){
      console.error("Error updating product: ", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      return deletedProduct;
    } catch (error) {
      console.error("Error deleting product: ", error);
      throw error;
    }
  }

  async find(query) {
    try {
      const products = await Product.find(query);
      return products;
    } catch (error) {
      throw new Error(`Error finding products: ${error.message}`);
    }
  }
  
}



module.exports = ProductOps;