
const upload=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/uploadImageMiddleware.js')
const {validatorUserRegistation}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/validators.js');
const {runValidation}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/runValidation.js');
//const {isLoggedin}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/isLoggedin.js');
const {verifyUserMiddleware}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/verifyUserMiddleware.js')
//this file create rest api...post,get,put,delete 
const {createUserController,findAllUser,findSingleUser,deleteUser,updateUser}=require('../controllers/restApiController.js')
const {searchUser}=require('../controllers/searchUser.js')
const {activeUserController}=require('../controllers/activeUserController.js')
const express=require('express')
const restApiRouter=express.Router();
restApiRouter.get('/read',verifyUserMiddleware,findAllUser);
restApiRouter.get('/readSingle/:id',findSingleUser);
restApiRouter.post('/create',validatorUserRegistation,runValidation,createUserController );
restApiRouter.post('/active',upload.single("image"),activeUserController );
restApiRouter.delete('/delete',deleteUser)
restApiRouter.put('/update/:id',upload.single("image"),updateUser)
restApiRouter.get('/search',searchUser);
module.exports={restApiRouter};