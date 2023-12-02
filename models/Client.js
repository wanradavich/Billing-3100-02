const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
    clientName: {
        type: "String",
        required: true,
    },
    clientCode: {
        type: "String",
        required: true,
    },
    companyName: {
        type: "String",
        required: true,
    },
    emailAddress: {
        type: "String",
        required: true,
    },
    },
    {collection: "clients"}
);
const Client = mongoose.model("Client", clientSchema);

module.exports = Client;