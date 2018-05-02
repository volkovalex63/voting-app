var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var mongoose = require('mongoose');
var path = require('path');

var upload = multer();
var app = express();

//model definition part
var user = require('./model/user.js');
var poll = require('./model/poll.js');

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.resolve(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use('/user', user);
app.use('/poll', poll);

mongoose.connect(('mongodb://localhost:27017/expressDB'));
// var pollSchema = mongoose.Schema({
//   name: String,
//   option_1: String,
//   option_2: String
// });
//
// var Poll = mongoose.model("Poll", pollSchema);
//


app.listen(3000);
