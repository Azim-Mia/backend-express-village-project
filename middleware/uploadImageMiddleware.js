const multer  = require('multer');
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
const upload=multer({storage:storage})
module.exports=upload