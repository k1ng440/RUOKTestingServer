'use strict';

var config = require('./../../config/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	contactNo: { type: Number, required: true },
	activationToken: { type: Number, default: null }
});
module.exports = mongoose.model('Admin', adminSchema);
