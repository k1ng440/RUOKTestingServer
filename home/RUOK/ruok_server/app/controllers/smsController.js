'use strict';

var config = require('./../../config/config'),
  async = require('async'),
  path = require('path'),
  mongoose = require('mongoose'),
  messaging = require('../lib/messaging'),
  PatientValidate = require('../lib/validate/patientValidate'),
  LogicErrors = require(path.resolve('consts/logic_errors')),
  Patient = require('../models/patientSchema'),
  Provider = require('../models/adminSchema'),
  twilio = require('twilio')(
    config.twilio.sid,
    config.twilio.token
  );

exports.incomingMessage = function (req, res, next) {
  var message = req.body;
  console.log("Incoming SMS:", message);
	
  if (message.Body.match(/Y/)) {
	  // Patient requires followup
	  async.waterfall([
		  function(callback) {
			 var patientContactNo = message.From.substring(config.twilio.countryCode.length);
			 console.log(patientContactNo);
			 Patient.findOne({ patContactNo: Number(patientContactNo) }, callback);	  
		  },
		  function(patient, callback) {
			   messaging.notifyProvider(patient, callback);
		  },
		  function() {
			  respond(res, "Your message has been sent " +
					       "and I will be in touch with you in the next 1-2 hours.");
		  }
	  ], next);
  } else {
	  respond(res, "I'm sorry, I don't understand that.")
  }
};

function respond(res, message) {
  //var twiml = new twilio.TwimlResponse();
  //twiml.message(message);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(message);
}