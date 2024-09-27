const PendingAdmission = require('../models/pending_admission');
const Teachers  = require("./../models/Teachers")
const Student = require("../models/Student")
const Subject = require('./../models/subject');
exports.getadminController = async (req, res) => {
    res.render('admin')
};

exports.getteachController = async (req, res) => {
    try {
        const teachers_data = await Teachers.find({}).populate('subjects', 'name');;
        res.render('teacher' , {teachers : teachers_data
        })
    } catch (error) {
        console.error('Error fetching teachers info', error)
    }
    
};
exports.postteachController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, employeeId, subjects, dateOfJoining, address } = req.body;

        
        const subjectIds = await Promise.all(subjects.map(async (subjectName) => {
            let subject = await Subject.findOne({ name: subjectName.trim() });

            if (!subject) {
                subject = new Subject({ name: subjectName.trim(), code: subjectName.trim().toLowerCase() });
                await subject.save();
            }

            return subject._id; 
        }));

 
        const newTeacher = new Teachers({
            firstName,
            lastName,
            email,
            phone,
            employeeId,
            subjects: subjectIds, 
            dateOfJoining,
            address: {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip
            }
        });

    
        const savedTeacher = await newTeacher.save();

        
        res.status(201).json({
            message: 'Teacher added successfully',
            teacher: savedTeacher
        });
    } catch (error) {
        console.error('Error adding teacher:', error);
        res.status(500).json({
            message: 'An error occurred while adding the teacher',
            error: error.message
        });
    }
}

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
                classes: [admission.grade],  
                subjects: [],  
                dateOfEnrollment: new Date(),
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



exports.getfeesController = async (req, res) => {
    res.render('fees')
};
