
var express = require('express');
var UserService = require('../service/userService');
var authService = require('../service/authService');

var usersRouter = express.Router();

var usersRoute = usersRouter.route('/');


/** Get All Users */
usersRoute.get(authService.isAuthenticated, function(req, res) {
  UserService.getAll().then(function(data){
    res.json(data);
  })
});

/** Create a User */
usersRoute.post(function(req, res) {
  UserService.create(req.body.username, req.body.password).then(function(data){
    res.json(data);
  });
});

/** Get specific User */
var userRoute = usersRouter.route('/:user_id');

userRoute.get(function(req, res) {
  UserService.get(req.params.user_id).then(function(data){
    res.json(data);
  });
});


/** Update a User */
userRoute.put(authService.isAuthenticated, function(req, res) {
  UserService.get(req.params.user_id).then(function(user){
    UserService.save(user, req.body.username, req.body.password).then(function(data){
      res.json(data);
    });
  });
});

/** Delete a user */
userRoute.delete(authService.isAuthenticated, function(req, res) {
  UserService.delete(req.params.user_id).then(function(data){
    res.json(data);
  });
});


module.exports = usersRouter;