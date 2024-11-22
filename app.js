var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var { PrismaClient } = require("@prisma/client");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var hbs = require('hbs');
hbs.registerHelper('formatName', function(name) {
  return name.toLowerCase().replace(/ /g, '-');
});

var indexRouter = require('./components/index/indexRoute');
var aboutRouter = require('./components/about/aboutRoute');
var contactRouter = require('./components/contact/contactRoute');
var productRouter = require('./components/product/productRoute');
var usersRouter = require('./components/users/usersRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/product', productRouter);
app.use('/detail', productRouter);
app.use('/users', usersRouter);

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
