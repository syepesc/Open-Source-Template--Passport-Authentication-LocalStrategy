const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Create User schema instance
const User = require('../models/users');
const { Passport } = require('passport');


// USERS CONTROLLERS
module.exports = {
    // Dashboard page
    displayDashboardPage: (req, res) => {
        res.render('dashboard', { title: 'Dashboard - Passport->LocalStrategy', name: req.user.name });
    },
    
    // Login page
    displayLoginPage: (req, res) => {
        res.render('login', { title: 'Login - Passport->LocalStrategy' });
    },

    // Register page
    displayRegisterPage: (req, res) => {
        res.render('register', { title: 'Register - Passport->LocalStrategy' });
    },

    // Register handle
    processUserRegistration: (req, res) => {
        // grab form inputs
        const { name, email, password, password2 } = req.body;
        let formErrors = [];

        // PASSWORD VALIDATIONS
        // check required fields
        if (!name || !email || !password || !password2) {
            formErrors.push({ msg: 'Please fill all the require (*) fields' });
        }
        // check password match
        if (password !== password2) {
            formErrors.push({ msg: 'Passwords do not match' });
        }
        // check password length
        if(password.length < 6) {
            formErrors.push({ msg: 'Password must be at least 6 characters.' });
        }

        // check errors
        if (formErrors.length > 0) {
            res.render('register', {
                title: 'Register - Passport->LocalStrategy',
                formErrors,
                name,
                email,
                password,
                password2
            });
        } else {
            // validation passed
            User.findOne({ email: email })
            .then(user => {
                // if user already exists
                formErrors.push({  msg: 'Email is already registered' });
                // if user = false (user is false because the search (User.findOne) was not successfully)
                if (user) {
                    // render errors and failed to register user
                    res.render('register', {
                        title: 'Login - Passport->LocalStrategy',
                        formErrors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // set password to hashed
                        newUser.password = hash;
                        // save user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in')
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    }));
                }
            })
            .catch(err => console.log(err));
        }
    },

    // Login handle
    processUserLogin: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/users/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    },

    // Logout handle
    performLogout: (req, res) => {
        req.logOut();
        req.flash('success_msg', 'Logout successfully');
        res.redirect('/users/login');
    }
}
