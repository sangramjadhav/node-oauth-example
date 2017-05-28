var mongoose = require('mongoose');
var Todo = require('../models/todo');

var TodoService = function(){}

TodoService.prototype.getAll = function (userId) {
  return Todo.find({ userId: userId }, function(err, todos) {
    if (err){
      return err;
    }

    return todos;
  });
};

TodoService.prototype.get = function (userId, id) {
  return Todo.find({ userId: userId, _id: id }, function(err, todo) {
    if (err){
      return err;
    }

    return todo;
  });
};

TodoService.prototype.create = function (userId, title, description) {
  var todo = new Todo();
  todo.title = title;
  todo.description = description;
  todo.userId = userId;

  return todo.save(function(err) {
    if (err){
      return err;
    }

    return { message: 'Todo created!', data: todo };
  });
};

TodoService.prototype.save = function (userId, id, title, description, callback) {
  return Todo.update({userId: userId, _id: id}, {title: title, description: description}, function(err, num, raw) {
    if (err){
      return callback(null, err);
    }

    return callback('Todo updated!', num);
  });
};

TodoService.prototype.delete = function (userId, id) {
  return Todo.remove({ userId: userId, _id: id}, function(err) {
    if (err){
      return err;
    }

    return { message: 'Todo Deleted!' };
  });
};

module.exports = new TodoService();