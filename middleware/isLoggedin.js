const isLoggedin=(req,res,next)=>{
  const refreshToken=req.cookies.refreshToken;
  const accessToken=req.cookies.accessToken;
  if(accessToken && refreshToken){
    res.json({success:true, message:"successFull Login"})
    return;
  }else{
    res.json({success:false, message:"Please login now"})
    
  }
  next();
}
module.exports={isLoggedin};