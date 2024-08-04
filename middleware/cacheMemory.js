const createError=require('http-errors');
const mcache = require('memory-cache');
const cache =(duration)=>{
try{
    return (req,res,next)=>{
      let key = '_express_' + req.originalUrl || req.url;
      let cacheBody = mcache.get(key);
      if(cacheBody){
        res.send(cacheBody);
      }else{
        res.sendResponse = res.send;
        res.send = (body)=>{
         mcache.put(key,body,duration * 10000);
         res.sendResponse(body);
        }
        next();
      }
    }
    }catch(error){
      next(createError(404,'not found'))
    }
  }
  module.exports={cache};
  