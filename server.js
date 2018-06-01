// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bp=require('body-parser');

app.use(bp.urlencoded({extended:false}))
var url="mongodb://"+process.env.MONGO_ID+":"+process.env.MONGO_PASS+"@ds243768.mlab.com:43768/trainer";
var adder=require('./adder');
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.use("/exer",adder);



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  
});
