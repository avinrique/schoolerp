const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');  
const Teacher = require('./models/Teachers'); 
const bcrypt = require('bcrypt');

const initialize = (passport) => {
  
    passport.use('admin', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Admin not found' });
            }
            const isMatch = await user.matchPassword(password);
            return isMatch ? done(null, user) : done(null, false, { message: 'Invalid password' });
        } catch (error) {
            return done(error);
        }
    }));

    
    passport.use('teacher', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            console.log(email,password)
            const teacher = await Teacher.findOne({ email });
            if (!teacher) {
                return done(null, false, { message: 'Teacher not found' });
            }
            if(teacher.password == password){
                isMatch = true
            }else{
                isMatch = false
            }
            
            return isMatch ? done(null, teacher) : done(null, false, { message: 'Invalid password' });
        } catch (error) {
            return done(error);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id) || await Teacher.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

module.exports = initialize;
