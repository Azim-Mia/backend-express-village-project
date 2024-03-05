//this file create rest api...post,get,put,delete 
const  jwt = require('jsonwebtoken');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const {server_port,db_url,accessTokenKey,refreshTokenKey,smtpPassword,smtpUser,clientUrl}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const emailWithNodeMailer=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/sendEmail.js');
const {makeAccessTokensService}=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/makeToken.js')
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
const createUserController=async(req,res,next)=>{
const {name,fatherName,motherName,email,password,nid,birthId,postCode, address, village,image}=req.body;
const payload={name, fatherName,motherName,email,password,nid,birthId,postCode,address,village,image};
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
module.exports={createUserController,findAllUser,findSingleUser};
