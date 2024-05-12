const { uuid } = require('uuidv4');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const Orderproduct=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/paymentModel.js')
const Product=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/productModels/productModel.js')
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
require('dotenv').config();
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false //true for live, false for sandbox
const paymentController=async(req,res,next)=>{
const {id,customername,address,phone,present} = req.body;
  const findone= await Villagemodel.findOne({_id:id});
  const tran_id=uuid();
   const data = {
        total_amount:900,
        currency: 'BDT',
        tran_id:tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3001/payment/success/${tran_id}`,
        fail_url: `http://localhost:3001/payment/fail/${tran_id}`,
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name:customername,
        cus_email: 'customer@example.com',
        cus_add1: address,
        cus_add2: present,
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: findone.postCode,
        cus_country: 'Bangladesh',
        cus_phone:phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: findone.address,
        ship_add2: address,
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    console.log(data);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
   // console.log(sslcz);
    sslcz.init(data)
    .then(apiResponse => {
        // Redirect the user to payment gateway
  let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({url:GatewayPageURL})
   const aa= Orderproduct.insertMany({name:"azim mia"})
 console.log(aa);
    }).catch((err)=>{
      console.log(err.message)
    })
}

const paymentSuccessController=async(req,res,next)=>{
  const trans=req.params.tranId;
  res.redirect(`http://localhost:3000/payment/success/${trans}`)
}
const failPayment=(req,res,next)=>{
  const trans=req.params.tranId;
  res.redirect(`http://localhost:3000/payment/fail/${trans}`)
}
module.exports={paymentController,paymentSuccessController,failPayment};