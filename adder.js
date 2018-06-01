var express=require('express');
var router=express.Router();
var mongo=require('mongodb').MongoClient;

var url="mongodb://"+process.env.MONGO_ID+":"+process.env.MONGO_PASS+"@ds243768.mlab.com:43768/trainer";
var app=express();

router.post('/newuser',function(req,res,next)
            {
  var name=req.body.username;
  console.log(name);
  
  mongo.connect(url,function(err,client){
    
    var db=client.db('trainer');
    var coll=db.collection('schedule');
    coll.find({uname:name}).toArray(function(err,doc){
    
      if(doc.length==0)
      {
        var id=Math.floor(Math.random() * 10000000);
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

router.post('/training',function(req,res,err){
  
  var uid=req.body.userid;
  var udesc=req.body.userdesc;
  var utime=req.body.usertime;
  var udate=req.body.userdate;
  
  mongo.connect(url,function(err,client){
  var db=client.db('trainer');
    var coll=db.collection('schedule');
    
    coll.find({"id1":uid}).toArray(function(err,doc){
    if(doc.length==0)
    {
      res.json({"Error":"User doesnt exist"})
      client.close();
      
    }
               
      else{
        var name=doc[0].uname;
        coll.update({"id1":uid},{"id1":uid,"uname":name,"description":udesc,"usertime":utime.toString(),"userdate":udate.toString()})
        res.json({"id1":uid,"uname":name,"description":udesc,"usertime":utime.toString(),"userdate":udate.toString()});
        client.close();
      }
    
    })
    
                                   
    
  });
  
});

module.exports = router;