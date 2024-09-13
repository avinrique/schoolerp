const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const teacherSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
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
    employeeId: {
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
    dateOfJoining: {
        type: Date,
        required: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
