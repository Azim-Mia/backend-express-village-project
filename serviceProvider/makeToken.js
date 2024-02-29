var jwt = require('jsonwebtoken');
const {clientUrl,accessTokenKey,refreshTokenKey}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const jwtAccessKey=require('/data/data/com.termux/files/home/mongodbAllClass/searchPagination/secret.js');
const makeTokens= (payload, tokenKey, {expireIn})=>{
  const token = jwt.sign(payload,accessTokenKey, expireIn);
  return token;
}
module.exports={makeTokens};
