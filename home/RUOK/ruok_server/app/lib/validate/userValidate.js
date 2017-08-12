'use strict';

exports.loginSchema = function() {
  var schema = {
    'email': {
      notEmpty: true,
      errorMessage: 'Email is required',
      isLowercase: {
        errorMessage: 'Email must be in lowercase'
      },
      isEmail: {
        errorMessage: 'Please enter correct email id'
      }
    },
    'password': {
      notEmpty: true,
      errorMessage: 'Password is required'
    }
  };
  return schema;
};