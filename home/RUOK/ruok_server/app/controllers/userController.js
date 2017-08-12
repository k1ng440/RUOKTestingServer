var async = require('async'),
  path = require('path'),
  // PatientValidate = require('../lib/validate/patientValidate'),
  LogicErrors = require(path.resolve('consts/logic_errors')),
  UserModel = require('../models/userSchema');

exports.getProfile = function (req, res, next) {
  console.log(req.decoded);
  UserModel.findById(req.params.id, function (error, user) {
    res.json(user);
  });
};

exports.updateProfile = function (req, res, next) {
  var info = req.body;

  UserModel.findById(req.params.id, function (error, user) {
    user.firstName = info.firstName;
    user.lastName = info.lastName;
    user.email = info.email;
    user.cellNumber = info.cellNumber;

    if (info.password) {
      user.password = info.password;
    }

    user.save(function (err, todo) {
      if (err) {
        res.status(500).send(err)
      }
      res.send(todo);
    });

  });

};