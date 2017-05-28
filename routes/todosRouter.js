
var express = require('express');
var TodoService = require('../service/todoService');
var authService = require('../service/authService');

var todosRouter = express.Router();

var todosRoute = todosRouter.route('/');


/** Get All Todos */
todosRoute.get(authService.isAuthenticated, function(req, res) {
  TodoService.getAll(req.user._id).then(function(data){
    res.json(data);
  });
});

/** Create a Todo */
todosRoute.post(authService.isAuthenticated, function(req, res) {
  TodoService.create(req.user._id, req.body.title, req.body.description).then(function(data){
    res.json(data);
  });
});

/** Get specific Todo */
var todoRoute = todosRouter.route('/:todo_id');

todoRoute.get(authService.isAuthenticated, function(req, res) {
  TodoService.get(req.user._id, req.params.todo_id).then(function(data){
    res.json(data);
  });
});



/** Update a Todo */
todoRoute.put(authService.isAuthenticated, function(req, res) {
  TodoService.save(req.user._id, req.params.todo_id, req.body.title, req.body.description, function(message, data){
    res.json(data);
  });
});


todoRoute.delete(authService.isAuthenticated, function(req, res) {
  TodoService.delete(req.user._id, req.params.todo_id).then(function(data){
    res.json(data);
  });
});


module.exports = todosRouter;