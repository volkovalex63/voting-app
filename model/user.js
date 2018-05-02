var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var multer = require('multer');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(('mongodb://localhost:27017/expressDB'));

var router = express.Router();
var userSchema = mongoose.Schema({
  name: String,
  password: String
});

var User = mongoose.model('User', userSchema);
var loginUser = "";

<!-- Log in part -->

router.post("/login", function(req, res){
  User.find({name: req.body.email}, function(err, response){
    if(response[0]){
      if(response[0]["password"] == req.body.password){
        loginUser = req.body.email;
        res.redirect("../../#!/home");
        console.log("Right!")
      }
      else {
        res.redirect("../../#!")
        console.log("Wrong number!");
      }
    }
    else res.redirect("../../#!/signup");
  });
});

<!-- Sign up part -->
router.post("/", function(req, res){
  var newUser = new User({
    name: req.body.email,
    password: req.body.password
  });

  User.find({name: req.body.email}, function(err, response){
    if(response[0]){
      res.redirect("../#!/signup");
      console.log("User exist already!");
    } else {
      newUser.save(function(err, User){
       res.redirect("../#!");
       loginUser = req.body.email;
       console.log("Save successfully!");
      });
    }
  });

});

// var logUser = [];
router.use("/getuser", function(req, res){
  // logUser.push(loginUser);
  res.json({user: loginUser});
});

// mongoose.connection.close();
module.exports = router;
