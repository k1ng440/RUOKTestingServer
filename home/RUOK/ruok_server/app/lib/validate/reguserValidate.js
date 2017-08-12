'use strict';

exports.reguserSchema = function() {

  var schema = {
    'firstName': {
      notEmpty: true,
      errorMessage: 'First Name is required'
    },
    'lastName': {
      notEmpty: true,
      errorMessage: 'Last Name is required'
    },
    'email': {
      notEmpty: true,
      errorMessage: 'email is required'
    }
  };
  return schema;
};


