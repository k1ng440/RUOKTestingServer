'use strict';

exports.reguserSchema = function() {

  var schema = {
    'firstName': {
      notEmpty: true,
      errorMessage: 'First Name is required'
      }
  };
  return schema;
};


