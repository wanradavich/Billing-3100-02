const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientCode: {
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