const express = require('express');
const router = express.Router();
const adminRouteController = require('./../controllers/admin');


router.route("/").get(adminRouteController.getadminController)


module.exports = router;