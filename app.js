var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mkdirp = require('mkdirp');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname + '/uploads');
  },
  filename: function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now()+ '.csv');
  }
})
process.env.PORT = 5000;

var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/uploadfile');
var showfileRouter = require('./routes/showfile');
var seedRouter = require('./routes/seed');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

mkdirp('uploads');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({
  fileFilter: function(req,file,cb){
    if(file.mimetype !== 'text/csv'){
      return cb({
        status: 400,
        message: 'only CSV files allowed',
      });
    }
    cb(null,true);
  },
  storage: storage,
}).single('file'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/uploadfile', uploadRouter);
app.use('/showfile',showfileRouter);
app.use('/seed', seedRouter);

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
