const semver = require("semver");

class Registery{
  constructor(){
    this.services = [];
    this.timeout = 15
  }

  // eslint-disable-next-line class-methods-use-this
  getKey(name, version, ip, port){
    return name+version+ip+port
  }


  cleanup(){
    const now = Math.floor(Date.now() / 1000);
    Object.keys(this.services).forEach(key => {
      if(this.services[key].timestamp + this.timeout < now){
        console.log(`Removed service  ${this.services[key].name} ${this.services[key].version} at ${this.services[key].ip}:${this.services[key].port} `);
        delete this.services[key];
      }
    });
  }

  get(name, version){
    this.cleanup();
    const candidates = Object.values(this.services).filter(service => {
      return service.name === name && semver.satisfies(service.version, version);
    });
    
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  
  register(name, version, ip, port){
    this.cleanup();
    const key = this.getKey(name, version, ip, port);
    if(!this.services[key]){
      this.services[key] ={};
      this.services[key].timestamp = Math.floor(Date.now() / 1000);
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      console.log(`Registered service  ${name} ${version} at ${ip}:${port} `);
      return key;
    }
    this.services[key].timestamp = Math.floor(Date.now() / 1000);
    console.log(`Updated service  ${name} ${version} at ${ip}:${port} `);
    return key
  }
  
  unregister(name, version, port, ip){
    const key =  this.getKey(name,version,ip,port);
    delete this.services[key];
    console.log(`Unregistered service  ${name} ${version} at ${ip}:${port} `);
    return key;
  }
}

module.exports = new Registery();