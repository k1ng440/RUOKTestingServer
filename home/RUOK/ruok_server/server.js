'use strict';

var config = require('./config/config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var validate = require('express-validator');
var path = require('path');
var chalk = require('chalk');
var ejs = require('ejs');
var nocache = require('nocache');

var initMiddleware = function () {
  app.enable('trust proxy');
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(validate());
  app.use(nocache());	
};

var initStaticRoutes = function () {
  //  Define route path for homepage
  app.use(express.static(path.join(__dirname, 'public')));
};

var initRoutes = function () {

  /* eslint-disable global-require */
  require('./app/routes/routes')(app);
  /* eslint-enable global-require */
  //  All undefined URL will call this function
  app.all('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/views/common/404.html'));
    // res.sendFile(path.join(__dirname, 'public/index.html'));
  });
};

var initErrorlogger = function () {
  // development error handler
  // will print stacktrace
  if (process.env.NODE_ENV === 'development') {
    app.use(function (err, req, res, next) {
      res.status(500).json({ status: 0, message: 'Something went wrong', result: err.stack });
    });
  } else {
    app.use(function (err, req, res, next) {
      res.status(500).send({ status: 0, message: 'Something went wrong', result: '' });
    });
  }
};

function start() {
  mongoose.Promise = global.Promise;
  var mongooseDb = mongoose.connect(config.MongoDB.uri);

  app.set('tokenSecret', config.tokenSecret); // secret variable
  app.set('expiresIn', config.expiresIn); // secret variable

  // Initialize Express middleware
  initMiddleware();
  app.engine('html', ejs.renderFile);
  //  Initialize static route (index.html)
  initStaticRoutes();

  //  Initialize all Route
  initRoutes();

  //  Initialize Error logger
  initErrorlogger();

  //  App listen
  listen();

}

function listen() {
  app.listen(config.port, config.host, function () {
    // Create server URL
    var server = 'http://' + config.host + ':' + config.port;
    // Logging initialization
    if (!process.env.pm_id || process.env.pm_id === '0') {
      console.log('restart');
      console.log(chalk.white(''));
      console.log(chalk.green.bold(config.app.title));
      console.log(chalk.green('App version:     ' + config.app.version));
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Mongo Database:  ' + config.MongoDB.uri));
    }
  });
}

start();
