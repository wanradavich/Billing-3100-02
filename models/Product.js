const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    unitCost: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Product", productSchema);