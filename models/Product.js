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
});

module.exports = mongoose.model("Product", productSchema);