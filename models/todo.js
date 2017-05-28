var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: String
});


module.exports = mongoose.model('Todo', TodoSchema);
