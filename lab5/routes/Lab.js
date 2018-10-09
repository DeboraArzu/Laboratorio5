var express = require('express');
var router = express.Router();

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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(people);
});

//HTTP GET /getitems
router.get("/people", function (req, res, next) {
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
router.delete('/deletepeople/:id', function (req, res,next) {
  var id = req.params.id;
  console.log(id);
  const person = people.people.find(p => p.id == id);
  if(!person) res.status(404).send('No id found');
  const index = people.people.indexOf(person);
  people.people.splice(index,1);
  res.status(204).send(person);
});

//HTTP PUT
router.put('/people/:id', function (req, res, next) {
  var id = req.params.id;
  const person = people.people.find(c => c.id == id);
  if (!person) res.status(404).send('No id found');
  person.name = req.body.name;
  person.age = req.body.age
  person.profession = req.body.profession
  res.status(204).send(req.person);
});

///////////////////////////////////////////////////////////////////////////////////

module.exports = router;
