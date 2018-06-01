var express=require('express');
var router=express.Router();

var app=express();

router.post('/training',function(req,res,next)
            {
  
  console.log("yo");
}
            );

module.exports = router;