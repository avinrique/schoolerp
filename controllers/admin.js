const PendingAdmission = require('../models/pending_admission');
const Teachers  = require("./../models/Teachers")
const Student = require("../models/Student")
const Subject = require('./../models/subject');
const Class = require("./../models/class")
const Routine = require("./../models/Routine")
exports.getadminController = async (req, res) => {
    try {
        const totalstudent = await Student.countDocuments()
        const totalTeachers = await Teachers.countDocuments()
        const totalpendingaddmissions =  await PendingAdmission.countDocuments({status :"Pending"})
        const totalapprovedaddmissions =  await PendingAdmission.countDocuments({status :"Accepted"})
       
        res.render('admin' , {totalstudent , totalTeachers ,totalpendingaddmissions , totalapprovedaddmissions})
    } catch (error) {

    }  
};

exports.getteachController = async (req, res) => {
    try {
        const teachers_data = await Teachers.find({}).populate('subjects', 'name code').populate('classes' , 'class section' );
        res.render('teacher' , {teachers : teachers_data
        })
    } catch (error) {
        console.error('Error fetching teachers info', error)
    }
    
};


exports.postteachController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, employeeId, subjects, dateOfJoining, address ,password, classNumber,sections } = req.body;

        
        const subjectIds = await Promise.all(subjects.map(async (subjectName) => {
            let subject = await Subject.findOne({ name: subjectName.trim() });

            if (!subject) {
                subject = new Subject({ name: subjectName.trim(), code: subjectName.trim().toLowerCase() });
                await subject.save();
            }

            return subject._id; 
        }));

        console.log(classNumber)
        

        const classPromises = classNumber.map(async (classItem, index) => {
            const sectionList = sections[index].split(',').map(section => section.trim());
            const sectionPromises = sectionList.map(async (section) => {
                
                let existingClass = await Class.findOne({ class: classItem, section });
                if (!existingClass) {
                  
                    existingClass = new Class({ class: classItem, section });
                    await existingClass.save();
                }
                return existingClass._id;
            });
            return Promise.all(sectionPromises);
        });

        const classSectionIds = (await Promise.all(classPromises)).flat();
        const newTeacher = new Teachers({
            firstName,
            lastName,
            email,
            phone,
            password,
            employeeId,
            classes:  classSectionIds,
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




exports.getroutineController = async (req, res) => {
    try {
        //classses

        const teachers_data = await Teachers.find({}).populate('subjects', 'name').populate('classes' , 'class section' );
        const subjects = await Subject.find({}); // Fetch all subjects
        const classes = await Class.find({}); // Fetch all classes

        const { teacherId } = req.params;
        const routine = await Routine.find({ teacher: teacherId })
            .populate('teacher', 'firstName lastName')
            .populate('subject', 'name')
            .populate('class', 'class section')
            .exec();

        console.log(routine, teachers_data);
        res.render('routine', {
            routine: routine,
            teacher: teachers_data,
            subjects: subjects, // Pass subjects to the view
            classes: classes // Pass classes to the view
        });
    } catch (error) {
        console.error('Error fetching routine:', error);
        res.status(500).json({
            message: 'An error occurred while fetching the routine',
            error: error.message
        });
    }
};


exports.postroutineController = async (req, res) => {
    try {
        const { teacherId, dayOfWeek, startTime, endTime, subjectId, classId, roomNumber, notes } = req.body;

        // Check if the teacher, subject, and class exist
        const teacher = await Teachers.findById(teacherId);
        const subject = await Subject.findById(subjectId);
        const classs = await Class.findById(classId);

        if (!teacher || !subject || !classs) {
            return res.status(404).json({ message: 'Invalid teacher, subject, or class ID' });
        }

        // Create a new routine entry
        const newRoutine = new Routine({
            teacher: teacherId,
            dayOfWeek,
            timeSlot: { startTime, endTime },
            subject: subjectId,
            class: classId,
            roomNumber,
            notes
        });

        // Save the routine to the database
        const savedRoutine = await newRoutine.save();

        res.status(201).json({
            message: 'Routine created successfully',
            routine: savedRoutine
        });
    } catch (error) {
        console.error('Error creating routine:', error);
        res.status(500).json({
            message: 'An error occurred while creating the routine',
            error: error.message
        });
    }
}


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
