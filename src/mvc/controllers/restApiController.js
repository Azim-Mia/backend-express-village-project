//this file create rest api...post,get,put,delete 
const  jwt = require('jsonwebtoken');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const {server_port,db_url,accessTokenKey,refreshTokenKey,smtpPassword,smtpUser,clientUrl}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const emailWithNodeMailer=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/sendEmail.js');
const {makeTokens}=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/makeToken.js')
const {Villagemodel}=require('../models/villageModel.js');
const createUserController=async(req,res,next)=>{
const {name,fatherName,motherName,email,password,nid,birthId,postCode, address, village,image}=req.body;
const token=await makeTokens({name, fatherName,motherName,email,password,nid,birthId,postCode,address,village,image},accessTokenKey, '30s');
const emailData={
  email,
  subject:'Active Account Email',
  html:`<h2>Hello User</h2>
  <div>Verify your email</div><div><a href="${clientUrl}/users/activate/:${token} " target="_blank ">Active Accound</a></div>
  `
};
//await emailWithNodeMailer(emailData)
 successResponse(res,{
  email,
   success:true,
   message:"SuccessFull User Check your Email Confirm now",
   payload:{token},
 })
}
module.exports={createUserController};
