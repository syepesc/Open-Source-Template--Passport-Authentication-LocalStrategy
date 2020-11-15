const express = require('express');

// INDEX CONTROLLERS
module.exports = {
    displayHomePage: (req, res) => {
        res.render('home', { title: 'Home - Passport->LocalStrategy' });
    },

    displayDashboardPage: (req, res) => {
        res.render('dashboard', { title: 'Dashboard - Passport->LocalStrategy', name: req.user.name });
    }
}