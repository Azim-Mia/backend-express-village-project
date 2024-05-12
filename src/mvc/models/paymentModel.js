const {Schema,model}=require('mongoose')
const orderSchema= new Schema({
 /* product:[],
  data:[],
  paidStatus:{
    type:String,
    required:[true, "PaidStatus is not entry"],
  },
  tranjectionId:{
    type:String,
    required:[true, "tranjectionId is not entry"],
  },*/
name:{
  type:String,
}
})
const Orderproduct = new model("orderProduct",orderSchema);
module.exports=Orderproduct;