const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class', 
        required: true
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }],
    dateOfEnrollment: {
        type: Date,
        required: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    },
    guardianDetails: {
        fatherName: { type: String, required: true },
        motherName: { type: String, required: true },
        contactNumber: { type: String, required: true }
    },
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent', 'On Leave'],
            required: true
        }
    }],
    grades: [{
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',  
            required: true
        },
        marks: {
            type: Number,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
