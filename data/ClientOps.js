const Client = require("../models/Client.js");

class ClinetOps {
    ClinetOps() {}

  async getAllClients() {
    try{
      console.log("fetching all clients");
    const clients = await Client.find({}).sort({clientName: 1});
    return clients;
    } catch (error){
      console.error("Error fetching clients: ", error);
      throw error;
    }
  }

  async getClientById(id) {
    try{
      console.log("fetching client by id")
      const client = await Client.findById(id);
      return client;
    } catch (error){
      console.error("Error fetching clients by id: ", error);
      throw error;
    }
  }

  async createClient(clientData){
    try{
      const  newClient = new Client(clientData);
      await newClient.save();
      return  newClient;
    } catch (error) {
      console.error("Error creating client: ", error);
      throw error;
    }
  }

  async updatedClient(id, newData){
    try{
      const updatedClient = await Client.findByIdAndUpdate(id, newData, {
        new: true,
      });
      return updatedClient;
    }catch (error){
      console.error("Error updating product: ", error);
      throw error;
    }
  }

  async deletedClient(id) {
    try {
      const deletedClient = await Client.findByIdAndDelete(id);
      return deletedClient;
    } catch (error) {
      console.error("Error deleting client: ", error);
      throw error;
    }
  }

  async find(query) {
    try {
      const clients = await Client.find(query);
      return clients;
    } catch (error) {
      throw new Error(`Error finding clients: ${error.message}`);
    }
  }
  
}



module.exports = ClinetOps;