'use strict';

var async = require('async'),
  path = require('path'),
  PatientValidate = require('../lib/validate/patientValidate'),
  LogicErrors = require(path.resolve('consts/logic_errors')),
  Patient = require('../models/patientSchema');
  User = require('../models/userSchema')

exports.addNewPatient = function (req, res, next) { 
  var Info = req.body;
  var random = generateToken();
 
  async.waterfall([
    function(callback) { 
        req.checkBody(PatientValidate.patientSchema());
        var errors = req.validationErrors();
        if (errors) {
          res.json( LogicErrors.VALIDATION_ERROR(errors));
        } else {
          callback(null);
        }
    },
    function(callback) {
        Patient.findOne({"patientId": Info.patientId}, function(err,patient) {
          if(err){
            callback(err);
          }
          else if(patient){
            res.json({status: 2, message: 'Client ID already exists'});
          }
          else {
            callback(null);
          }
        });
    },
    function(callback) {   
      if (Info.followUpTime) {
              var time;
              var datetime = new Date();
              if(Info.followUpType == "minute") {
                time = Info.followUpTime;
              }
              if(Info.followUpType == "hour") {
                time = Info.followUpTime * 60;
              }
              if(Info.followUpType == "day") {
                time = Info.followUpTime * 24 * 60;
              }
              
              var msgSendTime = new Date(datetime.setTime(datetime.getTime() + time * 60 * 1000));
      }else{
              var msgSendTime = Info.options;

      }
        var newPatient = new Patient({
          patientId: Info.patientId,
        //  firstName: Info.firstName,
          proContactNo: Info.proContactNo,
          patContactNo: Info.patContactNo,
       //   dischargeProblem: Info.disProblem,
          followUpTime: Info.followUpTime,
          followUpType: Info.followUpType,
       //   comments: Info.comments,
          msgSendTime: msgSendTime,
          providerId: req.params.providerid,
          token: random
        });
        
        newPatient.save(function(err, result){
          if(err){
              callback(err);
          }    
          else{
              res.json({status: 1, message: 'New client added'});
          }
        });
    }
  ], function(err) {
      next(err); 
    });
};


exports.getPending = function (req, res, next) {
  var id = req.params.providerid;
      Patient.aggregate([
        { $match: { 'msgSend': {$eq: 0}, 'providerId': id } },
        { $sort: { msgSendTime: 1 } } 
      ], function(err,patient) {
          if(err){
            res.json({status: 0, message: 'Something went wrong', err});
          }
          else if( patient.length == 0 ){
            res.json({status: 0, message: 'There are no clients'});
          }
          else {
            res.json({status: 1, message: 'Client List', patient});
          }
        });
};

exports.getCompleted = function (req, res, next) {
  var id = req.params.providerid;
      Patient.aggregate([
        { $match: { 'msgSend': {$ne: 0}, 'providerId': id } },
        { $sort: { msgSendTime: -1, responseTime: -1 } } 
      ], function(err,patient) {
          if(err){
            res.json({status: 0, message: 'Something went wrong', err});
          }
          else if( patient.length == 0 ){
            res.json({status: 0, message: 'There are no clients'});
          }
          else {
            res.json({status: 1, message: 'Client List', patient});
          }
        });
};

exports.getUserProfile = function (req, res, next) {
   function(callback) {
        User.findOne({"cellNumber": Info.cellNumber}, function(err,user) {
          if(err){
            callback(err);
          }
          else if(user){
            res.json({status: 2, message: 'No user exist});
          }
          else {
            callback(null);
          }
        });
    },
};

function generateToken()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 16; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}