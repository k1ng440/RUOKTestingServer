'use strict';

var AuthController = require('../controllers/authController');
var DashboardController = require('../controllers/dashboardController');
var UserController = require('../controllers/userController');
var ClientController = require('../controllers/clientController');
var SMSController = require('../controllers/smsController');
var cron = require('../controllers/cronJob');
var jwt = require('jsonwebtoken');
// Define All Routes

module.exports = function (app) {

  // =====================================
  // AUTH SECTION =======================
  // =====================================
  app.post('/api/login', AuthController.login);
  app.post('/api/forgotPassword', AuthController.forgotpassword);
  app.post('/api/createUser', AuthController.createuser);
  app.post('/api/resetPassword/:token', AuthController.resetpassword);

  // =====================================
  // DASHBOARD SECTION =======================
  // =====================================
  
  // User
  app.get('/api/user/:id', isLoggedIn, UserController.getProfile);
  app.put('/api/user/:id', isLoggedIn, UserController.updateProfile);
  
  app.post('/api/addNewPatient/:providerid',isLoggedIn, DashboardController.addNewPatient);
  app.get('/api/getPending/:providerid',isLoggedIn, DashboardController.getPending);
  app.get('/api/getCompleted/:providerid',isLoggedIn, DashboardController.getCompleted);
  
  // =====================================
  // CLIENT SECTION =======================
  // =====================================
  app.post('/api/patientResponse', ClientController.patientResponse);
  app.post('/api/contactProvider', ClientController.contactProvider);
	
  // =====================================
  // TEXT MESSAGE SECTION =======================
  // =====================================
  app.post('/api/sms/incoming', SMSController.incomingMessage);

};

// route middleware to make sure
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get('tokenSecret'), function (err, decoded) {
      if (err) {
        return res.json({ status: 400, message: 'please signIn again' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.json({ status: 400, message: 'please signIn again' });
  }
}
