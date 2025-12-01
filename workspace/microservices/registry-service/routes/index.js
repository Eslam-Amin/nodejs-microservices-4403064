const express = require("express");

const router = express.Router();

router.get("/find/:serviceName/:serivceVersion",(req, res, next)=>{
  return next("Not Implemented YET!")
})

router.put("/register/:serviceName/:serivceVersion/:servicePort",(req, res, next)=>{
  return next("Not Implemented YET!")
})

router.delete("/register/:serviceName/:serivceVersion/:servicePort",(req, res, next)=>{
  return next("Not Implemented YET!")
})




module.exports = router;