const express = require('express')
const router = express.Router()
const adminRouteController = require('./../controllers/admin')
const { isAuthenticated ,ensureAdmin, ensureTeacher } = require('./../middlewares/authenticator')
router.route("/").get(isAuthenticated,ensureAdmin, adminRouteController.getadminController)
router.route("/teachers/postteachers").post(isAuthenticated,ensureAdmin, adminRouteController.postteachController)
router.route("/teachers").get(isAuthenticated, ensureAdmin,adminRouteController.getteachController)
router.route("/routine").get(isAuthenticated, ensureAdmin,adminRouteController.getroutineController).post(isAuthenticated,ensureAdmin, adminRouteController.postroutineController)
router.post('/pending_students/update', isAuthenticated,ensureAdmin, adminRouteController.updateEnrollmentStatus)
router.route("/pending_students").get(isAuthenticated,ensureAdmin, adminRouteController.getstudentController)
router.route("/fees").get(isAuthenticated,ensureAdmin, adminRouteController.getfeesController)

module.exports = router

