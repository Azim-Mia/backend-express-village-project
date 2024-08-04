const mongoose=require('mongoose');
const createError= require('http-errors');
const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const Product = require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/productModels/productModel.js');
const searchProducts = async(req,res,next) =>{
  const products=req.query.products || "";
   const page=Number(req.query.page) || 1;
   const limit=Number(req.query.limit) || 10;
    const searchRegExp=new RegExp('.*' + products + '.*', 'i');
    const filter={
      isAdmin:{$ne:true},
     $or:[
    {productName:{$regex:searchRegExp}},
  {slug:{$regex:searchRegExp}},
        ],
    };
const findProduct = await Product.find(filter).limit(limit)
  .skip((page-1) * limit);
  if(!findProduct) throw createError(404,"not found users");
  const count= await Product.find(filter).countDocuments();
 return successResponse(res,{
   statusCode:200,
 message:'user was return successfull',
 payload:{
 findProduct,
   pagination:{
    totalPage:Math.ceil(count/limit),
    correntPage:page,
    previousePage:page-1>0 ? page-1:null,
    nextPage:page+1 < Math.ceil(count/limit) ? page + 1:null,
  totalProducts:count
   },
 },
  });
}
module.exports={searchProducts}