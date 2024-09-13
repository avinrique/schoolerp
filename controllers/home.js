const User = require('../models/user');
exports.getHomeController = async (req, res) => {
 res.render('admin')
};