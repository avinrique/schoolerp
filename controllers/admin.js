const PendingAdmission = require('../models/pending_admission');
exports.getadminController = async (req, res) => {
    res.render('admin')
};
exports.getteachController = async (req, res) => {
    res.render('teacher')
};
exports.getstudentController = async (req, res) => {
    try {
    
        const pendingStudents = await PendingAdmission.find({ status: 'Pending' });
        const acceptedStudents = await PendingAdmission.find({ status: 'Accepted' });
       
        res.render('pen_std', { pendingStudents , acceptedStudents });
    } catch (error) {
        console.error('Error fetching pending admissions:', error);
        res.status(500).send('Server Error');
    }
};

exports.updateEnrollmentStatus = async (req, res) => {
    const { id, action } = req.body;

    try {
        const admission = await PendingAdmission.findById(id);

        if (!admission) {
            return res.status(404).send('Admission request not found.');
        }

        if (action === 'approve') {
            admission.status = 'Accepted';
            await admission.save();
        } else if (action === 'reject') {
            await PendingAdmission.findByIdAndDelete(id);
        } else if (action === 'enroll') {
     
            const newStudent = new Student({
                firstName: admission.studentName.split(' ')[0],
                lastName: admission.studentName.split(' ')[1],
                email: admission.parentEmail,
                phone: admission.parentContact,
                rollNumber: generateRollNumber(),  
                classes: [admission.grade],  
                subjects: [],  
                dateOfEnrollment: new Date(),
                address: admission.address,
                guardianDetails: {
                    fatherName: admission.guardianDetails.fatherName,
                    motherName: admission.guardianDetails.motherName,
                    contactNumber: admission.parentContact
                }
            });
            await newStudent.save();
            await PendingAdmission.findByIdAndDelete(id);
        } else if (action === 'cancel') {
            await PendingAdmission.findByIdAndDelete(id);
        }

        res.redirect('/admin/pending_students');
    } catch (error) {
        console.error('Error updating admission status:', error);
        res.status(500).send('Server Error');
    }
};
function generateRollNumber() {
    return 'ROLL-' + Math.floor(1000 + Math.random() * 9000);
}


exports.getfeesController = async (req, res) => {
    res.render('fees')
};
