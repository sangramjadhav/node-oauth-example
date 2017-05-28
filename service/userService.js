var mongoose = require('mongoose');
var User = require('../models/user');

var UserService = function(){}

UserService.prototype.getAll = function () {
  return User.find(function(err, users) {
    if (err){
      return err;
    }

    return users;
  });
};

UserService.prototype.get = function (id) {
  return User.findById(id, function(err, user) {
    if (err){
      return err;
    }

    return user;
  });
};

UserService.prototype.create = function (username, password) {
  var user = new User();
  user.username = username;
  user.password = password;

  return user.save(function(err) {
    if (err){
      return err;
    }

    return { message: 'user created!', data: user };
  });
};

UserService.prototype.save = function (user, username, password) {
  user.title = username;
  user.description = password;

  return user.save(function(err) {
    if (err){
      return err;
    }

    return user;
  });
};

UserService.prototype.delete = function (id) {
  return User.findByIdAndRemove(id, function(err) {
    if (err){
      return err;
    }

    return { message: 'user Deleted!' };
  });
};

module.exports = new UserService();