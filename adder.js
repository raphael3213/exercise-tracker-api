var express=require('express');
var router=express.Router();
var mongo=require('mongodb').MongoClient;

var url="mongodb://"+process.env.MONGO_ID+":"+process.env.MONGO_PASS+"@ds243768.mlab.com:43768/trainer";
var app=express();

router.post('/newuser',function(req,res,next)
            {
  var name=req.body.name;
  
  mongo.connect(url,function(err,client){
    
    var db=client.db('trainer');
    var coll=db.collection('schedule');
    coll.find({uname:name}).toArray(function(err,doc){
    
      if(doc.length==0)
      {
        var id=Math.random();
        coll.insert({"uname":name,"id1":id.toString()})
        res.json({"uname":name,"id1":id.toString()});
        client.close();
      }
      else
      {
      res.json({"Error":"Name already exists"})
        client.close();
      }
    })
  });
  
}
            );

module.exports = router;