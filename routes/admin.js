const express = require('express');
const router = express.Router();
const adminRouteController = require('./../controllers/admin');


router.route("/").get(adminRouteController.getadminController)
router.route("/teachers/postteachers").post(adminRouteController.postteachController )
router.route("/teachers").get(adminRouteController.getteachController)
router.post('/pending_students/update', adminRouteController.updateEnrollmentStatus);
router.route("/pending_students").get(adminRouteController.getstudentController)

router.route("/fees").get(adminRouteController.getfeesController)
module.exports = router;