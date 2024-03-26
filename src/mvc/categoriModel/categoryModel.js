const {Schema,model}=require('mongoose');
const productSchema= new Schema({
  name:{
   type:String,
   trim:true,
 required:[true, "name is required"],
minLength:[3, "must be 3 charecter"],
  },
slug:{
  type:String,
 required:[true, "slug is required"],
 unique:[true, "slug must be unique"],
}, 
description:{
  type:String,
  trim:true,
  required:[true, "description mest be required"],
  minLength:[3, "must be 3 charecter"],
  maxLength:[150, "maximum length 150 charecter"],
},
price:{
  type:Number,
  required:[true, "price is required"],
  trim:true,
  validate:{
    validator: (v)=> v>0,
  message:(props)=>`${props.value} is valid number. Not nagative Number`,
  },
},
image:{
 // type:Buffer,
 type:String,
  required:[true, "image is required"],
},
quantity:{
  type:Number,
  required:[true, "quantity is required"],
  trim:true,
  validate:{
    validator: (v)=> v>0,
  message:(props)=>`${props.value} is valid number. Not nagative Number`,
  },
},
shipping:{
  type:Number,
  trim:true,
  validate:{
    validator: (v)=> v>0,
  message:(props)=>`${props.value} is valid number. Not nagative Number`,
  },
},
sold:{
  type:Number,
  default:0,
  //required:[true, "sold is required"],
 },
 rating:{
  type:Number,
  default:4.1,
 },
 model:{
   type:String,
   trim:true,
 }
},{timestamps:true});
const Category=new model('category', productSchema);
module.exports=Category;

