const {login}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/controllers/authController.js')
const {isLoggedin}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/isLoggedin.js');
const express=require('express');
const authRouter=express.Router();
authRouter.post('/login',login);
module.exports=authRouter;