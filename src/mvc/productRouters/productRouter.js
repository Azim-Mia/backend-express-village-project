const { createProductController,
  readProductController,
  readOneProductController,
  updateProductController,
  deleteProductController}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/productControllers/productController.js')
  const upload=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/uploadImageMiddleware.js')
const express=require('express')
const prouductRouter=express.Router();
prouductRouter.post('/create',upload.single("image"),createProductController)
prouductRouter.get('/read',readProductController)
prouductRouter.get('/readone/:id',readOneProductController)
prouductRouter.put('/update/:id',upload.single("image"),updateProductController)
prouductRouter.delete('/delete/:id',deleteProductController)
module.exports=prouductRouter;