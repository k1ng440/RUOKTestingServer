'use strict';
// Import AuthModel
var config = require('./../../config/config'),
  async = require('async'),
  path = require('path'),
  UserValidate = require('../lib/validate/userValidate'),
  RegUserValidate = require('../lib/validate/reguserValidate'),
  LogicErrors = require(path.resolve('consts/logic_errors')),
  Admin = require('../models/adminSchema'),
  User = require('../models/userSchema'),
  jwt = require('jsonwebtoken'),
  nodemailer = require('nodemailer'),
  ejs = require('ejs');
  var server = 'http://' + config.host + ':' + config.port;

exports.login = function (req, res, next) {

  var Info = req.body;
  Info.password = new Buffer(Info.password, 'base64').toString();
  async.waterfall([
    function(callback) {
      req.checkBody(UserValidate.loginSchema());
      var errors = req.validationErrors();
      if (errors) {
        res.json( LogicErrors.VALIDATION_ERROR(errors));
      } else {
        callback(null);
      }
    },
    function(callback) {
      User.findOne({ 'email': Info.email, 'password': Info.password }, { 'password': 0, 'activationToken':0 }, function (err, user) {
        if (err) {
          callback(err); 
        } else if (!user) {
          res.json(LogicErrors.INVALID_CREDENCIAL);
        } else {
          callback(null, user);
        }
      });
    },
    function(user, callback) {
          var token = jwt.sign(user, req.app.get('tokenSecret'), {
            expiresIn: req.app.get('expiresIn') // from config file
          });
          res.json({ status: 1, message: 'login Successful', token: token, user });
    }
  ], function(err) {
    next(err);
  });
};

exports.forgotpassword = function (req, res, next) {
  var Info = req.body;
  var random;
  async.waterfall([
    function(callback) {
        Admin.findOne({ email: Info.email },function(err, user) {
            if(err){
              callback(err);
            } else if(!user){
              res.json({ status: 0, message: 'Email not registered' });
            } else {
              callback(null, user);
            }
        })
    },
    function(user, callback) {
        random = Math.floor((Math.random() * 1000000) + 54);
        // create reusable transporter object using the default SMTP transport
        Admin.update({ 'email': Info.email }, { 'activationToken': random }, function(err, response) {
            if(err){
              callback(err);
            } else if(response.nModified == 0) {
              res.send({ status: 0, message: "error in reset password update" });
            } else {
              callback(null,random,user._id);
            }
        });
    },
    function(random, userid, callback) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'testingdemo27@gmail.com',
                pass: 'demo12345678'
            }
        });
        var link = config.clientUrl + "/resetPassword/" + random;
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"R U OK?" <testingdemo27@gmail.com>', // sender address
            to: Info.email, // list of receivers
            subject: 'Reset your Password', // Subject line
            text: 'Hello', // plain text body
            html : "Hello,<br> Please Click on the button to reset your password.<br><a href="+link+"><button>reset password</button></a>" // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.json({ status: 1, message: "please reset your password from mail"});
        });
    }     
  ], function(err) {
    next(err);
  });
};

//createUser
exports.createuser = function (req, res, next) {
  var Info = req.body;
  
  async.waterfall([
    function(callback) {
      console.log(RegUserValidate.reguserSchema());
      var schema = RegUserValidate.reguserSchema();
      req.check(schema);        // will check 'password' no matter where it is but 'email' in query params
      req.checkQuery(schema);   // will check 'password' and 'email' in query params
      req.checkBody(schema);    // will check 'password' in body but 'email' in query params
      req.checkParams(schema);  // will check 'password' in path params but 'email' in query params
      req.checkHeaders(schema);  // will check 'password' in headers but 'email' in query params
      
        // req.checkBody(RegUserValidate.reguserSchema());
        req.asyncValidationErrors().then(function(errors) {
          callback(null);
        }, function(errors) {
          console.log(errors);
            res.status(400).json(LogicErrors.VALIDATION_ERROR(errors));       
        });
    },
    function(callback) {
      console.log('check email if unique');
        User.findOne({ email: Info.email }, function(err, user) {
          if(err){
            callback(err);
          }
          else if(user){
            res.json({status: 2, message: 'Email already exists'});
          }
          else {
            callback(null);
          }
        });
      console.log('email check complete');
    },
    function(callback) {
         console.log("CREATE USER");
        var newUser = new User({
          firstName: Info.firstName,
          lastName: Info.lastName,
	 	      email: Info.email,
		      password: Info.password,
		      cellNumber: Info.cellNumber
        });
        
        newUser.save(function(err, result){
          if(err){
              callback(err);
          }    
          else{
              res.json({status: 1, message: 'New User added'});
          }
        });
    }
  ], function(err) {
    next(err);
  });
};


exports.resetpassword = function (req, res, next) {
  var random = req.params.token;
  var Info = req.body;
  Info.password = new Buffer(Info.password, 'base64').toString();
  async.waterfall([
    function(callback) {
      Admin.update({ 'activationToken':random }, { 'password': Info.password, 'activationToken': null }, function(err,response){
        if(err){
            callback(err);
        } else if(response.nModified == 0) {
            res.send({status: 0, message: 'error in reset Password'});
        } else {
            res.send({status: 1, message: 'password reset successfully'});
        }
      });
    }
  ], function(err) {
  next(err);
  });
};


/*new Buffer(Info.password).toString('base64')*/