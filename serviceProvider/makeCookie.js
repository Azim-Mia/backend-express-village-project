const createAccessTokenCookie=(res, accessToken)=>{
  res.cookie('accessToken',accessToken,{
    maxAge:16*60*1000,
    httpOnly:true,
   // secure:true,
    sameSide:'none',
    date:new Date(),
  })
};
const createRefreshTokenCookie=(res, refreshToken)=>{
  res.cookie("refreshToken",refreshToken,{
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    sameSide:'none',
  date:new Date(),
  });
  
}
const createForgetPasswordCookie=(res, forgetPasswordToken)=>{
  res.cookie('forgetPassword',forgetPasswordToken,{
    maxAge:15*60*1000,
    httpOnly:true,
   // secure:true,
    sameSide:'none',
    date:new Date(),
  });
}
module.exports={createAccessTokenCookie,createRefreshTokenCookie,createForgetPasswordCookie};
