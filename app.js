const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const homeRoute = require('./routes/home');
const router = express.Router();

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
// dafhkdjhf
module.exports = app;
