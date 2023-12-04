const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  
    name: {
        type: "String",
        required: true,
    },
    code: {
      type: "String",
      required: true,
    },
    company: {
      type: "String",
      required: true,
  },
    email: {
      type: "String",
      required: true,
}
    },
    {collection: "profiles"}
);
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;

// const mongoose = require("mongoose");

// const profileSchema = mongoose.Schema(
//   {
    // MongoDB will automatically create an _id property, so no need to specify it UNLESS we want to create our own

    // We want every profile document to have a name which should be a string and required
    // name: { type: "String", required: true },

    // interests are optional, so lets just specify that they must be of type Array
    // interests: Array,
  // },
  // as a second argument, let's specify the collection we want to work with
//   { collection: "profiles" }
// );

// Pass the Schema into Mongoose to use as our model
// const Profile = mongoose.model("Profile", profileSchema);

// Export it so that we can use this model in our App
// module.exports = Profile;
