const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productCode: {
        type: String,
        required: true,
    },
    unitCost: {
        type: Number,
        required: true,
    }
    },
    {collection: "profiles"}
);
const Profile = mongoose.model("Product", productSchema);

module.exports = Profile;