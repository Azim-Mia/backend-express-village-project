//this file create rest api...post,get,put,delete 
const {createUserController,findAllUser,findSingleUser}=require('../controllers/restApiController.js')
const {activeUserController}=require('../controllers/activeUserController.js')
const express=require('express')
const restApiRouter=express.Router();
restApiRouter.get('/read', findAllUser);
restApiRouter.get('/readSingle/:id',findSingleUser);
restApiRouter.post('/create',createUserController );
restApiRouter.post('/active/:token',activeUserController );
module.exports={restApiRouter};