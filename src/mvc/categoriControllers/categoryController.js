const {errorResponse,successResponse}=require("/data/data/com.termux/files/home/backend-express-village-project/serviceProvider/errorAndSuccessHandle.js");
const cloudinary=require('/data/data/com.termux/files/home/backend-express-village-project/config/cloudinary.js');
const createError=require('http-errors');
const Category=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/categoriModel/categoryModel.js');
const slugify = require('slugify')
const createCategoryProduct=async(req,res,next)=>{
  try{
  const {name,price,description,image,quantity,shipping,sold,category,rating,model}=req.body;
 /* let images={};
  const modelProduct=await Product.findOne({name:name})
  if(modelProduct){
    res.json({success:false,message:"product already exist"})
  }
if(!image){
  res.json({success:false,message:"not found image"})
}else{
  const response = await cloudinary.uploader.upload(image,{
    folder:'ecommerce_azim',
  },function(result,err){
    if(result){
      console.log(result)
    }
    if(err){
      console.log(err.message)
    }
  });
images=response.secure_url;
}*/
  const create = new Product({
    name:name,
    slug:slugify(name),
    price:price,
    description:description,
    image:image,
    quantity:quantity,
    shipping:shipping,
    sold:sold,
    category:category,
    rating:rating
  })
  const result=await create.save();
return successResponse(res,{
  success:true,
  message:"successfull",
  payload:{result}
})
}catch(err){
  next(createError(404,err.message))
}
}

const readCategoryController=async(req,res,next)=>{
  const findProduct=await Product.find()
  if(!findProduct){
    res.json({success:false,message:"product not found"})
  }
  successResponse(res,{
    success:true,
    message:"successfull product return",
    payload:{findProduct},
  })
}
const readOneCategoryController=async(req,res,next)=>{
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
const updateCategoryController=async(req,res,next)=>{
  const {id}=req.params
  const {name,model,image,} =req.body;
  const productID=await Product.findOne({_id:id})
  if(!productID){
    res.json({success:false,message:"Not found user ID"})
  }
  let updates={};
  const updateOptions= {new:true,runValidators:true, context:'query'};
  for(let key in req.body){
    if(['name', 'sold', 'image', 'rating', 'price','slug','category'].includes(key)){
      updates[key]=req.body[key];
    }
  }
  const result=await Product.findByIdAndUpdate(productID,updates,updateOptions);
  successResponse(res,{
    success:true,
    message:"successfull update",
  })
}
const deleteCategoryController=async(req,res,next)=>{
const {id}=req.params;
  /* const userAdmin=Villagemodel.findOne({_id:id})
    if(userAdmin.isAdmin=true){
res.json({
      success:false,
      message:"User is Admin Not delete",
    })
    return;
  }*/
 const deleteProduct=await Product.findByIdAndDelete({_id:id})
if(!deleteProduct){
res.json({success:false,message:"product not found"})  
}
successResponse(res,{
  success:true,
  message:"delete user successfull",
})
}

module.exports={createCategoryProduct,readCategoryController,readOneCategoryController,updateCategoryController,deleteCategoryController}