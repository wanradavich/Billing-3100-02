// set up for the searchbar
const ProductOps = require('../data/ProductOps');
const ProfileOps = require('../data/ProfileOps');

async function searchProfiles(query) {
    const profileOps = new ProfileOps();
    return await profileOps.find({ name: { $regex: query, $options: "i" } });
  }
  
  async function searchProducts(query) {
    const productOps = new ProductOps();
    return await productOps.find({ productName: { $regex: query, $options: "i" }});
  }
  
  module.exports = { searchProfiles, searchProducts };