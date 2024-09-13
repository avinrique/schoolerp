const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const router = express.Router();
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
const dbname = "schoolerp"
const dburl = "mongodb+srv://avin:avin@cluster0.fhxczjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl+dbname, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);
app.use('/auth',authRoute)

module.exports = app;
