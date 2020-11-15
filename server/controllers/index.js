const express = require('express');

// INDEX CONTROLLERS
module.exports = {
    displayHomePage: (req, res) => {
        res.render('home');
    },

    displayDashboardPage: (req, res) => {
        res.render('dashboard', { name: req.user.name });
    }
}