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
const userId=decoded.id;
const findUser = await Villagemodel.findById({_id:userId})
const deleteSuccessResult = await cloudinary({})
 
if(!deleteSuccessResult){
  console.log("image is not delete")
}
const {name,address,image}= req.body;
const imageUrl=image.url;
if(!imageUrl){
  res.json({success:false,message:"not found image"})
}
  const response = await cloudinary.uploader.upload(imageUrl,{
    folder:'ecommerce_azim',
  },function(result,err){
    if(result){
      console.log("Result Console:"+result)
    }
    if(err){
      console.log("Error or not Error Console:"+err.message)
    }
  });
//id generate from cookie
const deleteUrl=findUser.image.public_id;
console.log(deleteUrl);
const updateOptions= { new:true, runValidators:true, context:'query'};
let updates={};
if(imageUrl){
  updates.image={url:response.secure_url,public_id:response.public_id};
}
for(let key in req.body){
  if(['name','address'].includes(key)){
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