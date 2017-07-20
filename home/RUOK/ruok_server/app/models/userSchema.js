'use strict';

var config = require('./../../config/config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	cellNumber: { type: Number, required: true }
});

module.exports = mongoose.model('user', userSchema);
