'use strict';
var config = require('./../../config/config');
var path = require('path');
var async = require('async');
var Patient = require('../models/patientSchema');
var mongoose = require('mongoose');
var CronJob = require('cron').CronJob;
var client = require('twilio')(
    config.twilio.sid,
    config.twilio.token
);
var job = new CronJob({
  cronTime: '*/1 * * * *',
  onTick: function () {
    cronStart();
  },
  start: false
          // timeZone: 'America/Los_Angeles'
});
//if (!process.env.pm_id || process.env.pm_id === '0') {
  job.start();
//}

function cronStart() {

  async.waterfall([
    function(callback) {
        Patient.find(
          { msgSend: 0,
            msgSendTime: {
                $gt: new Date(new Date() - 60 * 60000 ),
                $lte: new Date(),
            }
          },
          { _id: 0, firstName: 1, patientId: 1, patContactNo: 1, token: 1 },
          function(err, patient) {
              if(err) {
                callback(err);
              } else {
                callback(null,patient);
              }
        });
    },
    function(patient, callback) {
        sendSMS(patient, function(err, response) {
          console.log('complete');
        });
    }
  ], function(err) {
    console.log(err);
  })

}



function sendSMS(patient, callback) {
  if (patient.length === 0) {
    callback(null);
  } else {

    var f = patient.pop();
    client.messages.create({
       from: config.twilio.mobile, //5309992633, // process.env.TWILIO_PHONE_NUMBER,
       to:  config.twilio.countryCode +''+ f.patContactNo, //process.env.CELL_PHONE_NUMBER,
       body: "Hello " + f.firstName + ", R U Ok?  Please click on link for follow up: " + config.clientUrl + "/clientView/" + f.token
     }, function(err, message) {
        if(err) {

          Patient.update({ msgSend: 0, patientId: f.patientId }, { msgSend: 2, msgSendTime: new Date() }, function(err, response) {
              if(err) {
                sendSMS(patient, callback);
              } else {
                sendSMS(patient, callback);
              }
          });

        } else {

          Patient.update({ msgSend: 0, patientId: f.patientId }, { msgSend: 1, msgSendTime: new Date() }, function(err, response) {
              if(err) {
                sendSMS(patient, callback);
              } else {
                sendSMS(patient, callback);
              }
          });
        }
    });
  }
}
