var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//追記//
var bodyParser = require('body-parser');
var session = require('express-session');
//var validator = require('express-validator');ここでは無理
// view engine setupの上か下?
///////

var home = require('./routes/home');
var index = require('./routes/index');//indexRouter
var users = require('./routes/users');//usersRouter
//追記//
console.log('home');
console.log(home);
console.log('****************************');
console.log('index');
console.log(index);
console.log('****************************');
console.log('users');
console.log(users);
console.log('****************************');
///////

var app = express();

// var validator = require('express-validator');
// app.use(validator());

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// var validator = require('express-validator');
// app.use(validator());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// //追記// req.check is not a functionエラーになる
// var validator = require('express-validator');
// app.use(validator());
// ///////

var validator = require('express-validator');
app.use(validator());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

///////////////////////////////////////////////////////

//追記//
var session_opt = {
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized:false,
  cookie:{max:60*60*1000}
};
app.use(session(session_opt));

///////////////////////////////////////////////////////

//追記//
app.use('/users',users);
app.use('/',index);
app.use('/home',home);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
///////

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
