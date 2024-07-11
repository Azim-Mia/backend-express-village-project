const {paymentController,paymentSuccessController,failPayment,cancelPayment} =require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/productOrderController/productOrderController.js');
const express=require('express');
const paymentRouter=express.Router();
paymentRouter.post('/payment',paymentController)
paymentRouter.post('/payment/success/:tranId',paymentSuccessController)
paymentRouter.post('/payment/fail/:tranId',failPayment)
paymentRouter.post('/payment/cancel/:tranId',cancelPayment);
module.exports=paymentRouter;