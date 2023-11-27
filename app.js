const { mongoose } = require("mongoose");
const Product = require("./models/Product");
const Client = require("./models/Client");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://member-A02:PFhtLJ2GXqcHb9jo@billing-a02.xtm7iin.mongodb.net/?retryWrites=true&w=majority"
  

// set up default mongoose connection
mongoose.connect(uri);

// store a reference to the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Once we have our connection, let's load and log our profiles
db.once("open", async function () {
  const profiles = await getAllProfiles();
  console.log(profiles);
  // if we don't close the db connection, our app will keep running
  db.close();
});


async function getAllProfiles() {
  let profiles = await Product.find({});
  return profiles;
}
async function getAllProfiles() {
    let profiles = await Client.find({});
    return profiles;
  }


