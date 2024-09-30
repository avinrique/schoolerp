const User = require('./../models/User');  
const Teacher = require('../models/Teachers'); 
const passport = require('passport');
require('dotenv').config();

exports.getloginController = async (req, res) =>{
    res.render('login')    
}

exports.postloginController = (req, res, next) => {
    const { email, password, role } = req.body;

    if (role === 'admin') {
        passport.authenticate('admin', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Login failed' });
                }
                return res.redirect('/admin'); 
            });
        })(req, res, next);
    } else if (role === 'teacher') {
        passport.authenticate('teacher', (err, user, info) => {
            if (err) {
                return res.status(500).json({ message: 'Server error' });
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Login failed' });
                }
                return res.redirect('/admin'); 
            });
        })(req, res, next);
    } else {
        return res.status(400).json({ message: 'Invalid role' });
    }
};




exports.getSignupForm = (req, res) => {
    res.render('signup'); 
};

exports.signupAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        res.status(201).redirect('/auth/login'); 
    } catch (error) {
        console.error(error);
        res.status(400).render('signup', { error: 'Error creating user. Please try again.' });
    }
};