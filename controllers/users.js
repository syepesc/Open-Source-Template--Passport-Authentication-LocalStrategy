const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// Create User schema instance
const User = require('../models/users');
const { Passport } = require('passport');


// USERS CONTROLLERS
module.exports = {
    // Login page
    displayLoginPage: (req, res) => {
        res.render('login');
    },

    // Register page
    displayRegisterPage: (req, res) => {
        res.render('register');
    },

    // Register handle
    processUserRegistration: (req, res) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        // PASSWORD VALIDATIONS
        // check required fields
        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Please fill in all fields' });
        }
        // check password match
        if (password !== password2) {
            errors.push({ msg: 'Passwords do not match' });
        }
        // check password length
        if(password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters.' });
        }

        // check errors
        if (errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            });
        } else {
            // validation passed
            User.findOne({ email: email })
            .then(user => {
                // if user exists
                errors.push({  msg: 'Email is already registered' });
                if (user) {
                    res.render('register', {
                        errors,
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
            });
        }
    },

    // Login handle
    processUserLogin: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
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
