const express = require('express');
const router = express.Router();

const homeRouteController = require('./../controllers/home');

router.get('/', homeRouteController.getHomeController);

router.get('/enrollment', homeRouteController.getenrollmentController)
router.post('/enrollment', homeRouteController.postEnrollmentController);

module.exports = router;
