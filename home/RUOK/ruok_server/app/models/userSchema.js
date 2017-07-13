'use strict';

var config = require('./../../config/config');
var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var userSchema = mongoose.Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	cellNumber: { type: Number, required: true }
});

//userSchema.methods.generateHash = function(password){    
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
//}

//userSchema.methods.validPassword = function(password){
//    return bcrypt.compareSync(password, this.local.password);
//}

module.exports = mongoose.model('user', userSchema);
