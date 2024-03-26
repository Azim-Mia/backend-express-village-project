const  jwt = require('jsonwebtoken');
require('cookie-parser');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const {accessTokenKey,refreshTokenKey}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const {makeAccessTokensService,makeRefreshTokensService}=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/makeToken.js')
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
const login=async(req,res,next)=>{
  try{
const {email,password}=req.body;
const user=await Villagemodel.findOne({email:email})
if(!user){
  res.json({success:false,message:"User or Password not match.Try again now"})
  return;
}
const isPasswordMatch= await bcrypt.compare(password, user.password);
  if(!isPasswordMatch){
      res.json({success:false,message:"User or Password not match.Try again now"})
      return;
  };
  const token=await makeAccessTokensService({email},accessTokenKey,"2m")
  res.cookie("accessToken", token,{
  maxAge:2*60*1000,
    httpOnly:true,
   // secure:true,
    sameSide:'none',
    date:new Date(),  
  })
  const reFreshToken=await makeRefreshTokensService({email},refreshTokenKey,"20m")
  res.cookie("refreshToken", reFreshToken,{
  maxAge:30*24*60*60*1000,
    httpOnly:true,
   // secure:true,
    sameSide:'none',
    date:new Date(),  
  })
  return successResponse(res,{
    success:true,
    message:"Login successFull",
    payload:{},
  })
  }catch(error){
    if(error instanceof mongoose.Error){
   next(createError(404,'mongoose problem ')) 
  }
  }
}
const logout=(req,res,next)=>{
  try{
const accessToken=res.clearCookie('accessToken');
const refreshToken=res.clearCookie('refreshToken');
successResponse(res,{
  success:true,
  message:"successFull cookie clear",
})
}catch(error){
 console.error("error:__", error.message); 
}
}
module.exports={login,logout};