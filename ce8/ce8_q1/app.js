var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var process = require('process');
var db = require('./models/db.js');

var staffModel = require('./models/staff.js');
var deptModel = require('./models/dept.js');
var workfModel = require('./models/work.js');

staffModel.sync();
deptModel.sync();
workfModel.sync(); 

process.on('SIGINT', db.cleanup);
process.on('SIGTERM', db.cleanup);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var deptRouter = require('./routes/dept');
var staffRouter = require('./routes/staff');

var app = express();

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Allow requests from localhost:3001
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE'); // Allow these methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow these headers

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/staff', staffRouter);
app.use('/dept', deptRouter);

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
