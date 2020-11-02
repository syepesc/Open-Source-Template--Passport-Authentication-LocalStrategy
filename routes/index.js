const express = require('express');
const router = express.Router();
const { ensureAuthentication } = require('../config/auth');


// Home page
router.get('/', (req, res) => {
    res.render('home');
});

// Dashboard page
router.get('/dashboard', ensureAuthentication, (req, res) => {
    res.render('dashboard', {
        name: req.user.name
    });
});



module.exports = router;