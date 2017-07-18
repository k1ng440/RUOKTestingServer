'use strict';

exports.patientSchema = function() {

  var schema = {
    'patientId': {
      notEmpty: true,
      errorMessage: 'Patient ID is required'
    },
    'proContactNo': {
      notEmpty: true,
      errorMessage: 'Contact Number is required'
    },
    'patContactNo': {
      notEmpty: true,
      errorMessage: 'Contact Number is required'
    },
  };
  return schema;
};
