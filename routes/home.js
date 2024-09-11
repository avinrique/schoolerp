const express = require('express');
const router = express.Router();
const homeRouteController = require('./../controllers/home');

router.get('/', homeRouteController.getHomeController);

module.exports = router;
