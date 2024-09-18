const PendingAdmission = require('../models/pending_admission');
const fs = require('fs')
exports.getHomeController = async (req, res) => {
 res.render('home')
};
exports.getenrollmentController = async (req, res) => {
    res.render('enrollment')
};

const path = require('path');
const multer = require('multer');
const uploadsDir = path.join(__dirname, './../public');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); 
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 3000000 },

}).fields([
    { name: 'birth_certificate', maxCount: 1 },
    { name: 'transfer_certificate', maxCount: 1 }
]);



exports.postEnrollmentController = (req, res) => {
  
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          
            return res.status(400).json({ message: 'File upload error', error: err.message });
        } else if (err) {
          
            return res.status(400).json({ message: err.message });
        }

     
        const {
            student_name,
            grade,
            dob,
            gender,
            parent_name,
            parent_contact,
            parent_email,
            street,
            city,
            state,
            zip_code,
            previous_school,
            reason,
            language,
            additional_info
        } = req.body;

      
        const birthCertificate = req.files['birth_certificate'] ? req.files['birth_certificate'][0].path : null;
        const transferCertificate = req.files['transfer_certificate'] ? req.files['transfer_certificate'][0].path : null;

        try {
          
            const newAdmission = new PendingAdmission({
                studentName: student_name,
                grade,
                dob,
                gender,
                parentName: parent_name,
                parentContact: parent_contact,
                parentEmail: parent_email,
                address: {
                    street,
                    city,
                    state,
                    zipCode: zip_code
                },
                previousSchool: previous_school || null,
                reasonForAdmission: reason || null,
                preferredLanguage: language,
                birthCertificate: birthCertificate, 
                transferCertificate: transferCertificate || null,  
                additionalInfo: additional_info || null
            });

            await newAdmission.save();
            res.status(200).json({ message: 'Enrollment data submitted successfully' });
        } catch (error) {
            console.error('Error saving enrollment data:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
};