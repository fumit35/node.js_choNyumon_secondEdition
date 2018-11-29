var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//hello追加
var hello = require('./routes/hello');

//Session追加
var session = require('express-session');

//ajax追加
var ajax = require('./routes/ajax');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//validator追加
var validator = require('express-validator');

app.use(validator());
//今回は、requireでモジュールをロードするだけでなく、
//app.useでvalidatorを追加しなければならない。
//このため、hello.jsではなく、app.js内であらかじめ実行しておく。


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session追加
var session_opt = {
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge:60 * 60 * 1000}
};
app.use(session(session_opt));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//hello追加
app.use('/hello',hello);

//ajax追加
app.use('/ajax',ajax);




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
