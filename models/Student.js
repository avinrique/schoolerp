const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName: {
        type: String,
        
        trim: true
    },
    lastName: {
        type: String,
        
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        
        trim: true
    },
    rollNumber: {
        type: String,
        trim: true
    },
    class: {
        type : String
    },
    section :{
        type: String
    },
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
        street: { type: String},
        city: { type: String},
        state: { type: String},
        zip: { type: String}
    },
    guardianDetails: {
        fatherName: { type: String},
        motherName: { type: String},
        contactNumber: { type: String}
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
