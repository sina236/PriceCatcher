var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser=require('body-parser');
var cors=require('cors');
var UserLogin = require('./routes/userAuth');
var {route:userItems,verifyToken} = require('./routes/itemRoute');
var db = require("./Mongoose/DBSetup");
var amazon = require("./routes/AmazonRoute");
var ebay = require("./routes/Ebay");
var app = express();
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
db

app.use("/api/items",verifyToken,userItems);
app.use("/api/user",UserLogin);
app.use("/api/amazon",amazon);
app.use("/api/ebay",ebay);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
