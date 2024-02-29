//this file create rest api...post,get,put,delete 
const {createUserController}=require('../controllers/restApiController.js')
const {activeUserController}=require('../controllers/activeUserController.js')
const express=require('express')
const restApiRouter=express.Router();
restApiRouter.post('/create',createUserController );
restApiRouter.post('/active',activeUserController );
module.exports={restApiRouter};