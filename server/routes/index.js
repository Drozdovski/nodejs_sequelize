var express = require('express');
var router = express.Router();
var models = require('../models/index');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// get all todos
router.get('/tasks.json', function(req, res) {
  models.Todo.findAll({}).then(function(todos) {
    res.json(todos);
  });
});

// get single todo
router.get('/todo/:id', function(req, res) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    res.json(todo);
  });
});

// add new todo
router.post('/tasks.json', function(req, res) {
  models.Todo.create({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority
  }).then(function(todo) {
    res.json(todo);
  });
});

// update single todo
router.put('/todo/:id', function(req, res) {
  models.Todo.find({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    if(todo){
      todo.updateAttributes({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority
      }).then(function(todo) {
        res.send(todo);
      });
    }
  });
});

// delete a single todo
router.delete('/todo/:id', function(req, res) {
  models.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(todo) {
    res.json(todo);
  });
});

module.exports = router;
