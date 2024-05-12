const {Schema,model}=require('mongoose');
const { uuid } = require('uuidv4');
const bcrypt=require('bcryptjs')
const villageScheme=new Schema({
   name:{
   type:String,
   trim:true,
   minLength:[3, 'minimum length three charecter'],
   mixLength:[30, 'minimum length thirty charecter'],
   required:[true, 'no empty User name'],
   lowercase:true,
  },
  fatherName:{
  type:String,
  trim:true,
  lowercase:true,
    required:[true, "name is not Empty"],  
  },
  motherName:{
  type:String,
  trim:true,
  lowercase:true,
    required:[true, "name is not Empty"],
},
email:{
        type: String,
        trim:true,
        lowercase: true,
        unique: true,
        required:[true, 'no empty Email'],
        validate: {
    validator: function(v) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"],
    },
    password:{
   type:String, 
   trim:true,
   required:[true, 'no empty Password'],
  set:(v)=>bcrypt.hashSync(v,bcrypt.genSaltSync(10)),
  },
  nid:{
  type:Number,
  trim:true,
 required:[true, "name is not Empty"], 
},
birthId:{
  type:Number,
  trim:true,
 required:[true, "name is not Empty"], 
},
postCode:{
  type:Number,
  trim:true,
  required:[true, "name is not Empty"],
},
address:{
  type:String,
  trim:true,
  lowercase:true,
    required:[true, "name is not Empty"],
},
village:{
  type:String,
  trim:true,
  lowercase:true,
  required:[true, "name is not Empty"],
},
image:{url:String,public_id:String},
isAdmin:{
   type:Boolean,
   default:false,
  },
  isBaned:{
    type:Boolean,
    default:false,
  },
},{timestams:true});
const Villagemodel= new model("villageModelDatabase", villageScheme);
module.exports= {Villagemodel}