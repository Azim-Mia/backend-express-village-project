var jwt = require('jsonwebtoken');
const {server_port,db_url,accessTokenKey,refreshTokenKey,smtpPassword,smtpUser,clientUrl}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const makeTokens= (payload, tokenKey, {expireIn})=>{
  const token = jwt.sign(payload,accessTokenKey, expireIn);
  return token;
}
module.exports={makeTokens};
