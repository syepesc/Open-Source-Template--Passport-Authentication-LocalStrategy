let express = require('express');
let router = express.Router();

// import authentication
const { ensureAuthentication } = require('../config/auth');

// import index controller
let indexController = require('../controllers/index');


// ROUTES

// GET - Home page
router.get('/', indexController.displayHomePage);

// GET - Dashboard page
router.get('/dashboard', ensureAuthentication, indexController.displayDashboardPage);



module.exports = router;