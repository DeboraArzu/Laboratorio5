var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Lab');
var app = express();
var router = express.Router();
//var fs = require('fs')


var people = {
  "people": [{
    id: 1,
    name: "John",
    age: "23",
    profession: "Teacher"
    
  },
  {
    id:2,
    name: "Sara",
    age: "22",
    profession: "Ingineer"
  },
  {
    id:3,
    name: "Carlos",
    age: "26",
    profession: "Doctor"
  }]
}
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//HTTP GET /getitems
app.get("/people", function (req, res, next) {
  // Reading Synchrously 
  //var files = require("fs");
  //var cont = fs.readFileSync("users.json");
  //console.log("Output Content : \n" + cont);
  res.json(people);
});

//HTTP POST
router.post('/post/', function(req, res, next) {
  const person = {
    id: people.people.length + 1
    ,name:req.body.name
    ,age:req.body.age
    ,profession:req.body.profession
  }
    people.people.push(person);
    res.status(201).send(person);
});

//HTTP DELETE
app.delete('/deletepeople/:id', function (req, res,next) {
  var id = req.params.id;
  console.log(id);
  const person = people.people.find(p => p.id == id);
  if(!person) res.status(404).send('No id found');
  const index = people.people.indexOf(person);
  people.people.splice(index,1);
  res.status(204).send(person);
});

//HTTP PUT


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
module.exports = router;
