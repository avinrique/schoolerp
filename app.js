const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const multer = require('multer');
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const initializePassport = require('./passport-config');
const LocalStrategy = require('passport-local').Strategy;
const Teacher = require("./models/Teachers")
const User = require("./models/User")
const teacherAdmin = require('./routes/teacherAdmin')

const fs = require('fs');
const { runInNewContext } = require('vm');

//upload dir to uploads
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}


const app = express();
// middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//session steup
const dbname = "schoolerps";
const dburl = process.env.DB_URL + dbname; // From .env
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dburl }),
}));

//pasport innitilaization
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// db conn
mongoose.connect(dburl, {


})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([
    { name: 'birth_certificate', maxCount: 1 },
    { name: 'transfer_certificate', maxCount: 1 }
]);

//file type check
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images and PDFs Only!');
    }
}

// routes
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use("/teachAdmin",teacherAdmin)

// error handleing middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = { app, upload };
