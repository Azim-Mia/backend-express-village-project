const {Schema,model}=require('mongoose')
const orderSchema= new Schema({
  tranjectionId:{
    type:String,
    required:[true, "tranjectionId is Empty"],
  },
  productInfo:{
  type:Object,
  },
  PaidStatus:{
    type:Boolean,
   default:false,
  },
name:{
  type:String,
}
})
const Orderproduct = new model("orderProduct",orderSchema);
module.exports=Orderproduct;