const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    companyName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Client", clientSchema);