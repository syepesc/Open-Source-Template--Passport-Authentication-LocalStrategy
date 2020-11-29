let express = require('express');
let router = express.Router();

// import authentication
const { ensureAuthentication } = require('../config/auth');

// import user controller
let usersController = require('../controllers/users');


// ROUTES
// GET - Dashboard page
router.get('/dashboard', ensureAuthentication, usersController.displayDashboardPage);

// GET - Login page
router.get('/login', usersController.displayLoginPage);

// POST - Process user login
router.post('/login', usersController.processUserLogin);

// GET - Register page
router.get('/register', usersController.displayRegisterPage);

// POST - Process user registration
router.post('/register', usersController.processUserRegistration);

// GET - Perform user logout
router.get('/logout', usersController.performLogout);



module.exports = router;