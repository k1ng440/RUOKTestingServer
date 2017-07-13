'use strict';

var config = require('./../../config/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var patientSchema = mongoose.Schema({
	patientId: { type: String, required: true, unique: true },
	firstName: { type: String },
    proContactNo: { type: Number, required: true },
    patContactNo: { type: Number, required: true },
	dischargeProblem: { type: String },
	followUpTime: { type: Number, required: true },
	followUpType: { type: String, required: true },
    comments: { type: String },
    providerId: { type: String, required: true },
    msgSendTime: { type: Date, required: true },
    msgSend: { type: Number, default: 0 },
    responseTime: { type: Date, default: null },
    response: { type: String, default: null },
    contactProvider: { type: String, default: null},
    responseDesc: { type: String, default: null },
    token: { type: String, default: null }
});
module.exports = mongoose.model('Patient', patientSchema);
