//this file create rest api...post,get,put,delete 
const cloudinary=require('/data/data/com.termux/files/home/backend-express-village-project/config/cloudinary.js');
require('dotenv').config();
const mongoose =require('mongoose');
const  jwt = require('jsonwebtoken');
const createError=require('http-errors');
const allowed_file_type =process.env.ALLOWED_FILE_TYPE || ["png", "jpeg","pdf"];
const fs=require('fs');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const {server_port,db_url,accessTokenKey,refreshTokenKey,smtpPassword,smtpUser,clientUrl}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const emailWithNodeMailer=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/sendEmail.js');
const {makeAccessTokensService}=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/makeToken.js')
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
const createUserController=async(req,res,next)=>{
const {name,fatherName,motherName,email,password,nid,birthId,postCode, address, village,image}=req.body;
const payload={name, fatherName,motherName,email,password,nid,birthId,postCode,address,village,image:image.url};
const findEmail= await Villagemodel.findOne({email:email});
if(findEmail){
  res.json({success:false, message:"User Already Register"})
  return;
}
const token=await makeAccessTokensService(payload,accessTokenKey, '10ms');
const emailData={
  email,
  subject:'Active Account Email',
  html:`<h2>Hello User</h2>
  <div>Verify your email</div><div><a href="${clientUrl}/active/:${token}" target="_blank ">Active Accound</a></div>
  `
};
await emailWithNodeMailer(emailData)
 successResponse(res,{
  email,
   success:true,
   message:"SuccessFull User Check your Email Confirm now",
   payload:{token},
 })
}
const findAllUser=async(req,res,next)=>{
const findAll=await Villagemodel.find().select("-password");
successResponse(res,{
  success:true,
  statusCode:200,
  message:"return all User successFull",
  payload:{findAll}
})
}
const findSingleUser=async(req,res,next)=>{
  const {id}=req.params;
  const userId = await Villagemodel.findOne({_id:id}).select("-password");
  if(!userId) {
    res.json({
      success:false,
      message:"not Found User id",
    })
  return;
  }
successResponse(res,{
  success:true,
  statusCode:200,
  message:"return all User successFull",
  payload:{userId}
})
}
const deleteUser=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const usersFind = await Villagemodel.findById({_id:id});
    if(!usersFind){
      return res.json({success:false,message:"user was not found. Try again"})
    }
    const pub = await usersFind.image.public_id;
  if(!pub){
      return res.json({success:false,message:"public_id was not found. Try again"})
    }  
  await cloudinary.uploader.destroy(pub);
   const userId=await Villagemodel.findByIdAndDelete({_id:id, isAdmin:false})
    if(!userId) {
    res.json({
      success:false,
      message:"not Found User id",
    })
  }
  }catch(error){
    if(error instanceof mongoose.Error){
   throw createError(404, 'Not update successfull');
  }
  next(error);
  }
 return successResponse(res,{
    success:true,
    message:"User delete successFull"
  })
}
const updateUser=async(req,res,next)=>{
  try{
const {id}=req.params;
const userId= await Villagemodel.findOne({_id:id});
    if(!userId) {
    res.json({
      success:false,
      message:"not Found User id",
    })
  return;
  }
  const updateOptions= { new:true, runValidators:true, context:'query'};
  const {name,address}=req.body;
  const image=req.file.image
  let updates={};
  for(let key in req.body){
  if(['name','address','image'].includes(key)){
      updates[key]=req.body[key];
    }
}
    const result =await Villagemodel.findByIdAndUpdate(userId,updates,updateOptions)
    if(!result){
      res.json({success:false, message:"user not Update"})
    }
    return successResponse(res,{
      statusCode:201,
      success:true,
      message:"successfull",
      payload:{result},
    })
}catch(error){
  console.error('Error:', error.message)  
}
}
const banUserById=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const userId= await Villagemodel.findOne({_id:id});
    if(!userId){
      res.json({success:false,message:"not match user id"})
    }
    //await findWithId(User,userId);
    const updates={isAdmin:true};
    const updateOptions= {new:true,runValidators:true, context:'query'};
    const updateUser=await Villagemodel.findByIdAndUpdate(
      userId,
    updates,
    updateOptions,
      ).select('-password');
      if(!updateUser){
        throw createError(404, 'not Update user id');
      }
    return successResponse(res,{
      statusCode:201,
      success:true,
      message:"successFull user Id ban.",
    });
  }catch(error){
    return next(error);
  }
}

const unBanUserById=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const userId= await Villagemodel.findOne({_id:id});
    if(!userId){
      res.json({success:false,message:"user ID not match"})
    }
    const updates={isAdmin:false};
    const updateOptions= {new:true,runValidators:true, context:'query'};
    const updateUser=await Villagemodel.findByIdAndUpdate(
      userId,
    updates,
    updateOptions,
      ).select('-password');
      if(!updateUser){
        throw createError(404, 'Not update successfull');
      }
    return successResponse(res,{
      statusCode:201,
      success:true,
      message:"successFull user unBanUserById.",
    });
  }catch(error){
    return next(error);
  }
}
module.exports={createUserController,findAllUser,findSingleUser,deleteUser,updateUser,banUserById,unBanUserById,updateUser};
