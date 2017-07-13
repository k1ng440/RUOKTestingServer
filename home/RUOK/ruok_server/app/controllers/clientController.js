'use strict';

var config = require('./../../config/config'),
  async = require('async'),
  path = require('path'),
  mongoose = require('mongoose'),
  messaging = require('../lib/messaging'),
  PatientValidate = require('../lib/validate/patientValidate'),
  LogicErrors = require(path.resolve('consts/logic_errors')),
  Patient = require('../models/patientSchema'),
  Provider = require('../models/adminSchema');

exports.patientResponse = function (req, res, next) {
  var Info = req.body;
  //console.log(Info);
      Patient.update(
        { token: Info.token },
        { response: Info.feel, responseTime: new Date() },
        function(err, response) {
          if(err){
            res.json({ status: 0, message: 'Something went Wrong', err});
          }
          else if(response.nModified == 0){
            res.json({ status: 2, message: 'Token already used Or Invalid Token'});
          }
          else {
            res.json({ status: 1, message: 'Your Response is save'});
          }
        });
};

exports.contactProvider = function (req, res, next) {
  var Info = req.body;
  //console.log(Info);
      async.waterfall([
        function(callback) {
          Patient.findOne({ token: Info.token }, function(err, patient) {
            if(err) {
              callback(err);
            } else {
              callback(null, patient);
            }
          })
        },
        function(patient, callback) {
              if(Info.contact == "yes") {
                messaging.notifyProvider( patient, function(err) {
                  if(err) {
                    callback(null);
                  } else {
                    callback(null);
                  }
                });
              }
              else {
                callback(null);
              }
        },
        function(callback) {
          Patient.update(
            { token: Info.token },
            { responseTime: new Date(), responseDesc: Info.desc, contactProvider: Info.contact , token: null },
            function(err, response) {
              if(err){
                res.json({ status: 0, message: 'Something went Wrong', err});
              }
              else if(response.nModified == 0){
                res.json({ status: 2, message: 'Token already used Or Invalid Token'});
              }
              else {
                res.json({ status: 1, message: 'Your Response is save'});
              }
        });
        }
      ], function(err) {
        next(err);
      })
};

