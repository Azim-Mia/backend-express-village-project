const mongoose=require('mongoose');
const {db_url}=require('/data/data/com.termux/files/home/backend-express-village-project/secret.js');
const connectDB=async()=>{
  try{
    await mongoose.connect(db_url);
    console.log("village db connection successfull")
    //process.exit(1);
  }catch(err){
  console.log(err.message)
  }
}
module.exports=connectDB;