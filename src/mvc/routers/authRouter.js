const {login,logout}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/authController/authController.js')
const {isLoggedin}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/isLoggedin.js');
const express=require('express');
const authRouter=express.Router();
authRouter.post('/login',login);
authRouter.post('/logout',logout);
module.exports=authRouter;