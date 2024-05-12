require('dotenv').config();
const  jwt = require('jsonwebtoken');
const createError=require('http-errors');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
const {server_port,db_url,accessTokenKey,refreshTokenKey,smtpPassword,smtpUser,clientUrl}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const cloudinary=require('/data/data/com.termux/files/home/backend-express-village-project/config/cloudinary.js');
const profileUpdate=async(req,res,next)=>{
try{
 const refreshToken=req.cookies.refreshToken;
const decoded= await jwt.verify(refreshToken,refreshTokenKey);
const {name,address}= req.body;
const image=req.file;
if(!image){
  res.json({success:false,message:"not found image"})
}else{
  const response = await cloudinary.uploader.upload(image,{
    folder:'ecommerce_azim',
  },function(result,err){
    if(result){
      console.log(result)
    }
    if(err){
      console.log(err.message)
    }
  });
  decoded.image=response.secure_url;
}
//id generate from cookie
const userId=decoded.id;
const updateOptions= { new:true, runValidators:true, context:'query'};
let updates={};
for(let key in req.body){
  if(['name','image','address'].includes(key)){
      updates[key]=req.body[key];
    }
}
const result =await Villagemodel.findByIdAndUpdate(userId,updates,updateOptions)
    if(!result){
      res.json({success:false, message:"user not Update"})
    }
return successResponse(res,{
  success:true,
  message:"User Update is successFull",
  payload:{result},
}) 
}catch(error){
  console.log( error.message)
}
}
module.exports={profileUpdate};