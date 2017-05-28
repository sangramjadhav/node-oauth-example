/* Frameworks and Libraries */
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var session = require('express-session');


/* Controllers- Routers */
var todosRouter = require('./routes/todosRouter');
var usersRouter = require('./routes/usersRouter');
var oauthRouter = require('./routes/oauthRouter');


mongoose.connect('mongodb://localhost:27017/todo');

var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(passport.initialize());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


var port = process.env.PORT || 3000;

app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use('/api/oauth2', oauthRouter);

app.listen(port);
console.log('API Service is running on: ' + port);
