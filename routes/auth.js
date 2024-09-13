const express = require('express');
const router = express.Router();
const authRouteController = require('./../controllers/auth');


router.route("/login").get(authRouteController.getloginController).post( authRouteController.postloginController)


module.exports = router;