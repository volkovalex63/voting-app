var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var multer = require('multer');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(('mongodb://localhost:27017/pollDB'));

var router = express.Router();

var pollSchema = mongoose.Schema({
  name: String,
  title: String,
  option: String,
  count: String
});
var Poll = mongoose.model('Poll', pollSchema);

router.use("/alldata", function(req, res){
  Poll.find({}, function(err, response){
    console.log(response);
    if(err){
      console.log("Error!");
    }
    else {
      res.json(response);
    }
  });
});

router.get("/mydata/:name", function(req, res){
  Poll.find({name: req.params.name}, 'title', function(err, response){
    console.log(response);
    if(err){
      console.log("Error!");
    }
    else {
      res.json(response);
    }
  });
});

router.get("/show/:id", function(req, res){
  Poll.findById(req.params.id, function(err, response){
    res.json(response);
  })
});
// <!-- New poll is made-->
router.post("/save", function(req, res){
  var option = req.body.option.split("\r\n");
  // console.log(req.body);
  var count = "";
  for(var i = 0; i < option.length; i++){
    count += "0$";
  }
  count = count.slice(0, count.length - 1);
  option = option.join("$");

  var newPoll = new Poll({
    name: req.body.name,
    title: req.body.title,
    option: option,
    count: count
  });

  newPoll.save(function(err, Poll){
   res.redirect("../#!/home");
   loginUser = req.body.email;
   console.log("Save successfully!");
  });
    // }
});

router.post("/update", function(req, res){
  Poll.findByIdAndUpdate(req.body.id, {count: req.body.count}, function(err, response){
    console.log("Update successfully");
  });
});

router.get("/delete/:id", function(req, res){
  // console.log("reached delete part!");
  Poll.findByIdAndRemove(req.params.id, function(err, response){
    if(!err)res.redirect("../#!/home");
    console.log("Delete successfully");
  });
});
// });
//
// // var logUser = [];
// router.use("/getuser", function(req, res){
//   // logUser.push(loginUser);
//   res.json({user: loginUser});
// });
module.exports = router;
