const axios = require("axios");
const config = require("../config");

class ServiceClient{
  static async getService(serviceName){
    try{
      const response = await axios.get(`${config.registry.url}/find/${serviceName}/${config.registry.version}`);
      if(!response.data.ip){
        throw new Error(`Couldn't find ${serviceName}:${config.registry.version}`);
      }
      return response.data;
    }catch(error){
      const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message;
      throw new Error(errorMessage);
    }
  }

  static async callService(serviceName, requestOptions){
    const {ip, port } = await this.getService(serviceName);
    requestOptions.url = `http://${ip}:${port}${requestOptions.url}`;
    try{
      const response = await axios(requestOptions);
      return response.data;
    }catch(error){
      const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message;
      throw new Error(errorMessage);
    }
  }
}

module.exports = ServiceClient;