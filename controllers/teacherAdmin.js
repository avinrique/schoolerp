const Teachers  = require("./../models/Teachers")
exports.getadminController = async (req, res) => {
    try {
        res.render('teacherAdmin')
    } catch (error) {
        console.log(error)
    }

};
