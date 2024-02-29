const errorResponse=(res, {statusCode=500, message='internal server Error'})=>{
 return res.status(statusCode).json({
    success:false,
    message:message,
  })
};
const successResponse=(res, {statusCode=200, message='user was return', payload={} })=>{
 return res.status(statusCode).json({
    success:true,
    message:message,
    payload,
  });
};
module.exports={errorResponse,successResponse};