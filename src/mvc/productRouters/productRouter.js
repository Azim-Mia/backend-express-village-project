const { createProductController,
  readProductController,
  readOneProductController,
  updateProductController,
  deleteProductController}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/productControllers/productController.js');
  const {cache} =require('/data/data/com.termux/files/home/backend-express-village-project/middleware/cacheMemory.js');
  const upload=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/uploadImageMiddleware.js')
const express=require('express')
const prouductRouter=express.Router();
prouductRouter.post('/create',upload.single("image"),createProductController);
prouductRouter.get('/',cache(100),readProductController)
prouductRouter.get('/:id',readOneProductController)
prouductRouter.put('/update/:id',upload.single("image"),updateProductController)
prouductRouter.delete('/delete/:id',deleteProductController)
module.exports=prouductRouter;