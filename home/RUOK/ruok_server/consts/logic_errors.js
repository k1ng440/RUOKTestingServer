'use strict';


exports.VALIDATION_ERROR = function(VALUE){

  var data = {
    status: 0,
    message: 'Validation error',
    result: VALUE
  }
  return data;
};

exports.CATEGORY_ALREADY_EXIST = {
  status: 0,
  message: 'Category already exists.'
}

exports.INVALID_CREDENCIAL = {
  status: 0,
  message: 'Invalid credentials.'
}


