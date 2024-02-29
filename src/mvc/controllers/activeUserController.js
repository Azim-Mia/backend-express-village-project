const  jwt = require('jsonwebtoken');
const createError= require('http-errors');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const {accessTokenKey,refreshTokenKey}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const activeUserController=async(req,res,next)=>{
  try{
  const token=req.body.token;
  if(!token) throw createError(404," token is not found");
    const decoded=await jwt.verify(token,accessTokenKey)
    successResponse(res,{
      success:true,
      message:"User successfull verify",
      payload:{decoded},
    })
}catch(err){
if(err){
  res.json({success:false,message:"not match info or token"})
}
}
}
module.exports={activeUserController}