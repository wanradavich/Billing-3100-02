const Profile = require("../models/Profile.js");
const ProfileOps = require("../data/ProfileOps");

const _profileOps = new ProfileOps();

exports.Index = async function (request, response) {
  console.log("loading profiles from controller");
  let profiles = await _profileOps.getAllProfiles();
  if (profiles) {
    response.render("profiles", {
      title: "Billing - Clients",
      profiles: profiles,
      errorMessage: "",
    });
  } else {
    response.render("profiles", {
      title: "Billing - Clients",
      profiles: [],
      errorMessage: "",
    });
  }
};

exports.Detail = async function (request, response) {
  const profileId = request.params.id;
  console.log(`loading single profile by id ${profileId}`);
  let profile = await _profileOps.getProfileById(profileId);
  let profiles = await _profileOps.getAllProfiles();

  if (profile) {
    response.render("profileDetails", {
      title: "Express Yourself - " + profile.name,
      profiles: profiles,
      profileId: request.params.id,
      profile: profile,
    });
  } else {
    response.render("profiles", {
      title: "Billing - Clients",
      profiles: [],
    });
  }
};

// Handle profile form GET request
exports.Create = async function (request, response) {
  response.render("profile-create", {
    title: "Create Profile",
    errorMessage: "",
    profile: {},
  });
};

// Handle profile form GET request
exports.CreateProfile = async function (request, response) {
  // instantiate a new Profile Object populated with form data
  let tempProfileObj = new Profile({
    name: request.body.name,
    code: request.body.code,
    email: request.body.email,
    company: request.body.company,
  });

  //
  let responseObj = await _profileOps.createProfile(tempProfileObj);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    let profiles = await _profileOps.getAllProfiles();
    console.log(responseObj.obj);
    response.render("profile", {
      title: "Express Billing - " + responseObj.obj.name,
      profiles: profiles,
      profileId: responseObj.obj._id.valueOf(),
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    console.log("An error occured. Item not created.");
    response.render("profile-create", {
      title: "Create Profile",
      profile: responseObj.obj,
      errorMessage: responseObj.errorMsg,
    });
  }
};

// Handle profile form GET request
exports.DeleteProfileById = async function (request, response) {
  const profileId = request.params.id;
  console.log(`deleting single profile by id ${profileId}`);
  let deletedProfile = await _profileOps.deleteProfileById(profileId);
  let profiles = await _profileOps.getAllProfiles();

  if (deletedProfile) {
    response.render("profiles", {
      title: "Billing - Clients",
      profiles: profiles,
      errorMessage: "",
    });
  } else {
    response.render("profiles", {
      title: "Billing - Clients",
      profiles: profiles,
      errorMessage: "Error.  Unable to Delete",
    });
  }
};
