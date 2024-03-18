const {accessTokenKey,refreshTokenKey}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
const  jwt = require('jsonwebtoken');
require('cookie-parser');
const verifyUserMiddleware=async(req,res,next)=>{
  const refreshTokens=req.cookies.refreshToken;
  const accessToken=req.cookies.accessToken;
  if(!refreshTokens){
    return res.json({success:false,message:"refreshToken valid login now"})
  }
  const decoded= await jwt.verify(refreshTokens,refreshTokenKey);
  if(!decoded){
 return  res.json({success:false,message:"Notvm verified refreshTokens"})
  }
  const email=decoded.email;
  const token= await jwt.sign({email},accessTokenKey,{expiresIn:'2m'})
  if(!token){
   return  res.json({success:false,message:"Not Create accessToken"}) 
  }
  res.cookie("accessToken",token,{maxAge:6000});
  next();
}
module.exports={verifyUserMiddleware};
/*const verifyUserMiddleware=(req,res,next)=>{
  const accessToken= req.cookies.accessToken;
  if(!accessToken){
    if(renewtoken(req,res)){
      next();
    }
  }else{
   jwt.verify(accessToken,accessTokenKey,(err,decoded)=>{
     if(err){
       return res.json({success:false,message:"accessToken not valid login now.."})
     }else{
       req.email=decoded.email
       next();
     }
    })
  }
}
const renewtoken=(req,res)=>{
  const refreshTokens=req.cookies.refreshToken;
  const accessToken=req.cookies.accessToken;
  let exist=false;
  if(!refreshTokens){
    return res.json({success:false,message:"refreshToken not access login now"})
  }else{
     jwt.verify(refreshTokens,refreshTokenKey,(err,decoded)=>{
     if(err){
     return res.json({success:false,message:"refreshToken validation fail"})  
     }else{
       const email=decoded.email
     const token=jwt.sign({email},accessTokenKey,{expiresIn:"2m"})
   req.cookie("accessToken",token,{maxAge:6000})
     exist=true;
     }
    })
  }
  return exist;
}
module.exports={verifyUserMiddleware};*/