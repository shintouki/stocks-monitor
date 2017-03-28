'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);

// socket.io middleware
var io = require('socket.io')(server);

// require('dotenv').load();

// mongoose middleware for mongodb
mongoose.connect(process.env.MONGO_URI);

// pug template engine middleware
app.set('views', process.cwd() + '/public/pug')
app.set('view engine', 'pug')

// server static files with express static middleware funciton
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/jquery', express.static(process.cwd() + '/node_modules/jquery/dist'));
app.use('/bootstrap/js', express.static(process.cwd() + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap/css', express.static(process.cwd() + '/node_modules/bootstrap/dist/css'));

// express session middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// bodyparser middle so i can use req.body, which is used with post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes, send in express and io middleware as parameters
routes(app, io);

var port = process.env.PORT || 8080;
server.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});