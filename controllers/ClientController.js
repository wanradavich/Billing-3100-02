const Client = require("../models/Client.js");
const ClientOps = require("../data/ClientOps");
// instantiate the class so we can use its methods
const _clientOps = new ClientOps();

exports.ClientIndex = async function (request, response) {
  console.log("loading clients from controller");
  let clients = await _clientOps.getAllClients();
  if (clients) {
    response.render("clients", {
      title: "Express Yourself - Profiles",
      clients: clients,
      errorMessage: "",
    });
  } else {
    response.render("clients", {
      title: "Express Yourself - Profiles",
      clients: [],
      errorMessage: "",
    });
  }
};

exports.ClientDetail = async function (request, response) {
  const clientId = request.params.id;
  console.log(`loading single client by id ${clientId}`);
  let client = await _clientOps.getClientById(clientId);
  let clients = await _clientOps.getAllClients();

  if (client) {
    response.render("client", {
      title: "Express Yourself - " + client.clientName,
      clients: clients,
      clientId: request.params.id,
     
    });
  } else {
    response.render("clients", {
      title: "Express Yourself - Profiles",
      clients: [],
    });
  }
};

// Handle client form GET request
exports.Create = async function (request, response) {
  response.render("profile-create", {
    title: "Create client",
    errorMessage: "",
    client: {},
  });
};

// Handle client form post request
exports.CreateClient = async function (request, response) {
  // instantiate a new Profile Object populated with form data
  let tempClientObj = new Client({
    clientName: request.body.clientName,
  });

  //
  let responseObj = await _clientOps.createClient(tempClientObj);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    let clients = await _clientOps.getAllClients();
    console.log(responseObj.obj);
    response.render("client", {
      title: "Express Yourself - " + responseObj.obj.name,
      clients: clients,
      clientId: responseObj.obj._id.valueOf(),
      
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    console.log("An error occurred. Item not created.");
    response.render("client-create", {
      title: "Create Client",
      client: responseObj.obj,
      errorMessage: responseObj.errorMsg,
    });
  }
};
// Handle delete profile GET request
exports.DeleteClientById = async function (request, response) {
  const clientId = request.params.id;
  console.log(`deleting single client by id ${clientId}`);
  let deletedClient = await _clientOps.deleteProfileById(clientId);
  let clients = await _clientOps.getAllClients();

  if (deletedClient) {
    response.render("Clients", {
      title: "Express Yourself - Clients",
      profiles: profiles,
    });
  } else {
    response.render("profiles", {
      title: "Express Yourself - Profiles",
      clients: clients,
      errorMessage: "Error.  Unable to Delete",
    });
  }
};

// Handle edit client form GET request
exports.Edit = async function (request, response) {
  const clientId = request.params.id;
  let clientObj = await _clientOps.getProfileById(clientId);
  response.render("client-form", {
    title: "Edit Client",
    errorMessage: "",
    client_id: clientId,
    client: clientObj,
  });
};

// Handle client edit form submission
exports.EditClient = async function (request, response) {
  const clientId = request.body.client_id;
  const clientName = request.body.name;

  // send these to profileOps to update and save the document
  let responseObj = await _clientOps.updateClientById(clientId, clientName);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    let clietns = await _clientOps.getAllClients();
    response.render("client", {
      title: "Express Yourself - " + responseObj.obj.name,
      clients: clients,
      clientId: responseObj.obj._id.valueOf(),
      
    });
  }
  // There are errors. Show form the again with an error message.
  else {
    console.log("An error occured. Item not created.");
    response.render("Client-form", {
      title: "Edit Client",
      client: responseObj.obj,
      clientId: clientId,
      errorMessage: responseObj.errorMsg,
    });
  }
};
