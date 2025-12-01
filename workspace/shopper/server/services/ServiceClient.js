const axios = require("axios");
const config = require("../config");

class ServiceClient{
  static async getService(serviceName){
    try{
      // const url = `${config.registry.url}/find/${serviceName}/${config.registry.version}`;
      // console.log("🚀 ~ ServiceClient ~ getService ~ url:", url)
      const response = await axios.get(`${config.registry.url}/find/${serviceName}/${config.registry.version}`);
      // console.log("🚀 ~ ServiceClient ~ getService ~ response.data:", response.data)
      if(!response.data.result.ip){
        throw new Error(`Couldn't find ${serviceName}:${config.registry.version}`);
      }
      return response.data.result;
    }catch(error){
      const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message;
      console.log("🚀 ~ ServiceClient ~ getService ~ errorMessage:", errorMessage)
      throw new Error(errorMessage);
    }
  }

  static async callService(serviceName, requestOptions){
    const {ip, port } = await this.getService(serviceName);
    // eslint-disable-next-line no-param-reassign
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