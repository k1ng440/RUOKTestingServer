'use strict';

var config = require('../../config/config'),
	twilio = require('twilio')(
    config.twilio.sid,
    config.twilio.token
  );

module.exports.sendSMS = function sendSMS(to, body, callback) {
	twilio.messages.create({
       from: config.twilio.mobile, //5309992633, // process.env.TWILIO_PHONE_NUMBER,
       to:   config.twilio.countryCode +''+ to, //process.env.CELL_PHONE_NUMBER,
       body: body
     }, function(err, message) {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
    });
}
	
module.exports.notifyProvider = function( patient, callback) {
  twilio.messages.create({
       from: config.twilio.mobile, //5309992633, // process.env.TWILIO_PHONE_NUMBER,
       to:   config.twilio.countryCode +''+ patient.proContactNo, //process.env.CELL_PHONE_NUMBER,
       body: 'Client: '+patient.patientId+', Contact No: tel:*67'+patient.patContactNo+' would like a call back in the next 1-2 hours.'
	  //', Condition: feeling '+patient.response
     }, function(err, message) {
        if(err) {
          callback(err);
        } else {
          callback(null);
        }
    });
}