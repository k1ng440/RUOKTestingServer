var path = require('path');
var LogicErrors = require(path.resolve('consts/logic_errors'));

module.exports = function (req, res, next) {
  req.checkBody({
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
  });

  var errors = req.validationErrors();
  if (errors) {
    res.json(LogicErrors.VALIDATION_ERROR(errors));
  } else {
    next();
  }

}
