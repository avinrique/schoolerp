const express = require('express');
const router = express.Router();
const authRouteController = require('./../controllers/auth');


router.route("/login").get(authRouteController.getloginController).post( authRouteController.postloginController)
// router.route("/signup").get(authRouteController.getsignupController).post( authRouteController.postsignupController)

router.get('/signup', authRouteController.getSignupForm);
router.post('/signup', authRouteController.signupAdmin);
module.exports = router