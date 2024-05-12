const {paymentController,paymentSuccessController,failPayment} =require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/authController/bkashPayment.js')
const express=require('express');
const paymentRouter=express.Router();
paymentRouter.post('/payment',paymentController)
paymentRouter.post('/payment/success/:tranId',paymentSuccessController)
paymentRouter.post('/payment/fail/:tranId',failPayment)
module.exports=paymentRouter;