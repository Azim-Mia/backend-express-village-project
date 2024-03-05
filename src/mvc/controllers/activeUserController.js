const  jwt = require('jsonwebtoken');
const createError= require('http-errors');
const {makeAccessTokensService,makeRefreshTokensService}=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/makeToken.js');
const {createAccessTokenCookie}=require('/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/makeCookie.js');
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const {server_port,db_url,accessTokenKey,refreshTokenKey,smtpPassword,smtpUser,clientUrl}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const activeUserController=async(req,res,next)=>{
  try{
  const token=req.body.token;
  if(!token) throw createError(404," token is not found");
      const decoded=await jwt.verify(token,accessTokenKey)
      if(!decoded) throw (404, "not veryfiy token");
    await Villagemodel.create(decoded);
    successResponse(res,{
      success:true,
      message:"User successfull verify",
      payload:{decoded},
    })
}catch(error){
  if(error instanceof mongoose.Error){
   next(createError(404,'Invalid search user Id')) 
   return
  }
  next(error);
}
}
module.exports={activeUserController}