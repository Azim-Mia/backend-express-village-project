const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const cloudinary=require('/data/data/com.termux/files/home/backend-express-village-project/config/cloudinary.js');
const createError=require('http-errors');
const Product=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/productModels/productModel.js')
const slugify = require('slugify')
const createProductController=async(req,res,next)=>{
  try{
  const {productName,price,description,image,quantity,shipping,sold,category,rating,model}=req.body;
  const url= "/data/data/com.termux/files/home/storage/dcim/camera/" + image;
  console.log(url)
if(!url){
  res.json({success:false,message:"not found image"})
}
  const response = await cloudinary.uploader.upload(url,{
    folder:'ecommerce_azim',
  },function(result,err){
    if(result){
      console.log(result)
    }
    if(err){
      console.log(err.message)
    }
  });
const images=response.secure_url;
  const productData = new Product({
    productName:productName,
    slug:slugify(productName),
    price:price,
    description:description,
    image:images,
    quantity:quantity,
    shipping:shipping,
    sold:sold,
    category:category,
    rating:rating
  })
  const result=await productData.save();
return successResponse(res,{
  success:true,
  message:"successfull",
  payload:{result}
})
}catch(err){
  next(createError(404,err.message))
}
}

const readProductController=async(req,res,next)=>{
  const findProduct=await Product.find();
  if(!findProduct){
    res.json({success:false,message:"product not found"})
  }
  successResponse(res,{
    success:true,
    message:"successfull product return",
    payload:{findProduct},
  })
}
const readOneProductController=async(req,res,next)=>{
  try{
  const {id}=req.params;
  const findoneProduct=await Product.findOne({_id:id});
  if(!findoneProduct){
    res.json({success:false,message:"product not found"})
    return;
  }
  successResponse(res,{
    success:true,
    message:"successfull product return",
    payload:{findoneProduct},
  })
}catch(error){
  if(error instanceof mongoose.Error){
   next(createError(404, error.message)) 
   return;
}
}
}
const updateProductController=async(req,res,next)=>{
  const {id}=req.params
  const {productName,model,image,} =req.body;
  const productID=await Product.findOne({_id:id})
  if(!productID){
    res.json({success:false,message:"Not found user ID"})
  }
  let updates={};
  const updateOptions= {new:true,runValidators:true, context:'query'};
  for(let key in req.body){
    if(['productName', 'sold', 'image', 'rating', 'price','slug','category'].includes(key)){
      updates[key]=req.body[key];
    }
  }
  const result=await Product.findByIdAndUpdate(productID,updates,updateOptions);
  successResponse(res,{
    success:true,
    message:"successfull update",
  })
}
const deleteProductController=async(req,res,next)=>{
try{
const {id}=req.params;
 const deleteProduct=await Product.findByIdAndDelete({_id:id})
if(id !== deleteProduct){
res.json({success:false,message:"product not found"})  
}
successResponse(res,{
  success:true,
  message:"delete user successfull",
})
}catch(error){
  next(createError(error.message))
}
}

module.exports={createProductController,readProductController,readOneProductController,updateProductController,deleteProductController}