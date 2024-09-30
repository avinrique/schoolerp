const express = require('express')
const router = express.Router()
const adminRouteControllera = require('./../controllers/teacherAdmin')
const { isAuthenticated , ensureTeacher } = require('./../middlewares/authenticator')
router.route("/").get(isAuthenticated,ensureTeacher, adminRouteControllera.getadminController)


module.exports = router