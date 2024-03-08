const upload=require('/data/data/com.termux/files/home/backend-express-village-project/middleware/uploadImageMiddleware.js')
const {Villagemodel}=require('/data/data/com.termux/files/home/backend-express-village-project/src/mvc/models/villageModel.js');
const express=require('express');
const uploadImageRouter=express.Router();
uploadImageRouter.put('/updates/:id',upload.single('image'), async(req, res) => {
    const id = req.params.id;
const images = req.file.image;
const updatesOption={new:true, runValidators:true, context:'query'}
const result=await Villagemodel.findByIdAndUpdate(id, images,updatesOption);
res.json({
  result:result
})
  });
  module.exports=uploadImageRouter;