
const upload=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/uploadImageMiddleware.js')
const {validatorUserRegistation}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/validators.js');
const {runValidation}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/runValidation.js');
//const {isLoggedin}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/isLoggedin.js');
const {verifyRefreshToken}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/verifyUserMiddleware.js')
const {isLoggedin}=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/isLoggedin.js')
//this file create rest api...post,get,put,delete 
const {createUserController,findAllUser,findSingleUser,deleteUser,updateUser,banUserById,unBanUserById}=require('../controllers/restApiController.js')
const {profileUpdate} =require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/updateSection/profileUpdateController.js')
const {searchUser}=require('../controllers/searchUser.js')
const {activeUserController}=require('../controllers/activeUserController.js')
const express=require('express')
const restApiRouter=express.Router();
restApiRouter.get('/read',verifyRefreshToken,findAllUser);
restApiRouter.get('/readSingle/:id',findSingleUser);
restApiRouter.post('/create',upload.single("image"),validatorUserRegistation,runValidation,createUserController );
restApiRouter.post('/active',upload.single("image"),activeUserController );
restApiRouter.delete('/delete/:id',deleteUser)
restApiRouter.put('/update/:id',upload.single("image"),updateUser)
restApiRouter.put('/update_profile',upload.single("image"),profileUpdate)
restApiRouter.put('/baned/:id',banUserById);
restApiRouter.put('/unbaned/:id',unBanUserById)
restApiRouter.get('/search',searchUser);
module.exports={restApiRouter};