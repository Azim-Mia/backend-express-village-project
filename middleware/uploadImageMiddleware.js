const multer  = require('multer');
require('dotenv').config()
const path=require('path');
const createError=require('http-errors');
const max_file_size=Number(process.env.MAX_FILE_SIZE) || 2097152;
const allowed_file_type =process.env.ALLOWED_FILE_TYPE || ["png", "jpeg","pdf"];
const {storeImage}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
console.log(storeImage);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,storeImage);
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' +file.originalname;
    cb(null,name)
  }
})
const fileFilter= (req,file,cb)=>{
  const extname=path.extname(file.originalname);
  if(!allowed_file_type.includes(extname.substring(1))){
    return cb(createError(400, "image extention not match"));
  }
  cb(null, true);
}
const upload=multer({storage:storage,
  limit:{fileSize:max_file_size},
  fileFilter,
})
module.exports=upload