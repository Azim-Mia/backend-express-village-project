
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
//need npm package npm i express-validator,
const {validationResult}=require('express-validator');
const runValidation=async(req,res,next)=>{
  try{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
    return successResponse(res,{
      statusCode:422,
      message: errors.array()[0].msg,
    })  
      return;
    }
  return next()
  }catch(error){
    next(error);
  }
}
module.exports={runValidation};