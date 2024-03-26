const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const isLoggedin=(req,res,next)=>{
  const accessToken=req.cookies.accessToken;
  if(!accessToken){
  res.json({success:false,message:"login now"})
  next()
  }else{
    res.json({success:true,message:"login successfull"})
  }
  next();
}
module.exports={isLoggedin};