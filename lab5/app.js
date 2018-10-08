var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var fs = require('fs')

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//HTTP GET /getitems
app.get("/getitems", function (req, res, next) {
  // Reading Synchrously 
  var files = require("fs");
  var cont = fs.readFileSync("users.json");

  console.log("Output Content : \n" + cont);

  res.json([JSON.parse(cont)]);
});

//HTTP POST
app.post("/addItem", function (req, res) {
  var cont = fs.readFileSync("users.json");

});

//HTTP DELETE
app.get("/deleteitem/:id", function (req, res) {

  // First read existing users.
  fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse(data);
    delete data["people" + req.params.id];
    console.log(data);
    res.end(JSON.stringify(data));
  });
})


///////////////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
