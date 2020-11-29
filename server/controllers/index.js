const express = require('express');

// INDEX CONTROLLERS
module.exports = {
    displayHomePage: (req, res) => {
        res.render('home', { title: 'Home - Passport->LocalStrategy' });
    }
}