const {createCategoryProduct}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/categoriControllers/categoryController.js')
const express=require('express');
const categoryRouter=express.Router();
categoryRouter.post('/create',createCategoryProduct)
module.exports=categoryRouter;