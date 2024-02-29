//custom require needs file
const {restApiRouter}=require('./src/mvc/routers/restApiRouter.js')
//npm package install add require
const express=require("express")
const bodyParser=require('body-parser');
const cors= require('cors');
const cookieParser = require('cookie-parser');
const createError=require('http-errors');
// express use app veriable
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:false}))
// parse application/json
app.use(bodyParser.json())
// cookie create package use generate cookie
app.use(cookieParser());
app.use(express.static(__dirname + "/backend-express-village-project/src"))
//custom api router use
app.use('/',restApiRouter);
//all error handle position
app.use((req,res,next)=>{
  next(createError(404, "Route is not found"))
});
app.use((err,req,res,next)=>{
  res.status(err.status || 500).json({
    success:"false",
    message:err.message,
  });
});
module.exports=app;
