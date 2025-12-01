const express = require("express");

const registery = require("../lib/Registery");

const router = express.Router();

function getRequestArgument(req){
 const {serviceName, serivceVersion, servicePort} = req.params;
  let serviceIp = req.ip;
  if(serviceIp.includes("::1") || serviceIp.includes("::ffff:127.0.0.1")) serviceIp = "127.0.0.1";
  return {serviceName, serivceVersion, servicePort, serviceIp}
}


router.get("/find/:serviceName/:serivceVersion",(req, res, next)=>{
  const {serviceName, serivceVersion} = getRequestArgument(req);
  const service = registery.get(serviceName, serivceVersion);
  if(!service)
    return res.status(404).json({error: "No Matching service found"})
  return res.json({result: service})
})

router.put("/register/:serviceName/:serivceVersion/:servicePort",(req, res, next)=>{
  const {serviceName, serivceVersion, servicePort, serviceIp} = getRequestArgument(req);
  const key = registery.register(serviceName, serivceVersion,serviceIp, servicePort);
  return res.json({result: key})
})

router.delete("/register/:serviceName/:serivceVersion/:servicePort",(req, res, next)=>{
  const {serviceName, serivceVersion, servicePort, serviceIp} = getRequestArgument(req);
  const key = registery.unregister(serviceName, serivceVersion,serviceIp, servicePort);
  return res.json({result: key})
})




module.exports = router;