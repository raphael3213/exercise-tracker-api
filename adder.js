var express=require('express');
var router=express.Router();



var app=express();

router.post('/newuser',function(req,res,next)
            {
  console.log(req)
  
}
            );

module.exports = router;