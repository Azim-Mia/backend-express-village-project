const {searchProducts} =require("/data/data/com.termux/files/home/backend-express-village-project/src/mvc/productSearchController/searchController.js");
const express=require('express')
const productSearchRouter=express.Router();
productSearchRouter.get('/search/',searchProducts);
module.exports={productSearchRouter}