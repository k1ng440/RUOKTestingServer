var path = require('path');
var LogicErrors = require(path.resolve('consts/logic_errors'));

module.exports = function (req, res, next) {
  req.checkBody({
    'email': {
      optional: {
        options: { checkFalsy: true } // or: [{ checkFalsy: true }]
      },
      isEmail: {
        errorMessage: 'Invalid Email'
      }
    },
    'password': {
      notEmpty: true,
      errorMessage: 'Invalid Password' // Error message for the parameter
    },
    'firstName': { //
      optional: true, // won't validate if field is empty
      isLength: {
        options: [ { min: 2, max: 10 }],
        errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
      },
      errorMessage: 'Invalid First Name'
    },
    'lastName': { //
      optional: true, // won't validate if field is empty
      isLength: {
        options: [ { min: 2, max: 10 }],
        errorMessage: 'Must be between 2 and 10 chars long' // Error message for the validator, takes precedent over parameter message
      },
      errorMessage: 'Invalid last Name'
    }
  });

  var errors = req.validationErrors();
  if (errors) {
    res.json(LogicErrors.VALIDATION_ERROR(errors));
  } else {
    next();
  }

}
